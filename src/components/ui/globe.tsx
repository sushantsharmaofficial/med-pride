"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { Color, Vector3, Object3D } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";
declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & {
      new (): ThreeGlobe;
    };
  }
}

extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

type PointData = {
  size: number;
  order: number;
  color: string;
  lat: number;
  lng: number;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

export function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<Object3D>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const defaultProps = useMemo(
    () => ({
      pointSize: 1,
      atmosphereColor: "#ffffff",
      showAtmosphere: true,
      atmosphereAltitude: 0.1,
      polygonColor: "rgba(255,255,255,0.7)",
      globeColor: "#1d072e",
      emissive: "#000000",
      emissiveIntensity: 0.1,
      shininess: 0.9,
      arcTime: 2000,
      arcLength: 0.9,
      rings: 1,
      maxRings: 3,
      ...globeConfig,
    }),
    [globeConfig]
  );

  // Initialize globe only once
  useEffect(() => {
    let globe: ThreeGlobe | null = null;
    const currentGroupRef = groupRef.current; // Store ref in variable for cleanup

    if (!globeRef.current && currentGroupRef) {
      try {
        globe = new ThreeGlobe();
        globeRef.current = globe;
        (currentGroupRef as Object3D).add(
          globeRef.current as unknown as Object3D
        );
        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing globe:", error);
      }
    }

    // Clean up on unmount
    return () => {
      if (globe && currentGroupRef) {
        try {
          currentGroupRef.remove(globe as unknown as Object3D);
          globeRef.current = null;
        } catch (error) {
          console.error("Error cleaning up globe:", error);
        }
      }
    };
  }, []);

  // Build material when globe is initialized or when relevant props change
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    try {
      const globeMaterial = globeRef.current.globeMaterial() as unknown as {
        color: Color;
        emissive: Color;
        emissiveIntensity: number;
        shininess: number;
      };
      globeMaterial.color = new Color(globeConfig.globeColor);
      globeMaterial.emissive = new Color(globeConfig.emissive);
      globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
      globeMaterial.shininess = globeConfig.shininess || 0.9;
    } catch (error) {
      console.error("Error setting globe material:", error);
    }
  }, [
    isInitialized,
    globeConfig.globeColor,
    globeConfig.emissive,
    globeConfig.emissiveIntensity,
    globeConfig.shininess,
  ]);

  // Build data when globe is initialized or when data changes
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    try {
      const arcs = data;
      const points = [];
      for (let i = 0; i < arcs.length; i++) {
        const arc = arcs[i];
        points.push({
          size: defaultProps.pointSize,
          order: arc.order,
          color: arc.color,
          lat: arc.startLat,
          lng: arc.startLng,
        });
        points.push({
          size: defaultProps.pointSize,
          order: arc.order,
          color: arc.color,
          lat: arc.endLat,
          lng: arc.endLng,
        });
      }

      // remove duplicates for same lat and lng
      const filteredPoints = points.filter(
        (v, i, a) =>
          a.findIndex((v2) =>
            ["lat", "lng"].every(
              (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"]
            )
          ) === i
      );

      // Set globe properties
      globeRef.current
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(defaultProps.showAtmosphere)
        .atmosphereColor(defaultProps.atmosphereColor)
        .atmosphereAltitude(defaultProps.atmosphereAltitude)
        .hexPolygonColor(() => defaultProps.polygonColor);

      // Fix type errors by properly casting data objects
      globeRef.current
        .arcsData(data)
        .arcStartLat((d: object) => (d as unknown as Position).startLat * 1)
        .arcStartLng((d: object) => (d as unknown as Position).startLng * 1)
        .arcEndLat((d: object) => (d as unknown as Position).endLat * 1)
        .arcEndLng((d: object) => (d as unknown as Position).endLng * 1)
        .arcColor((e: object) => (e as unknown as Position).color)
        .arcAltitude((e: object) => (e as unknown as Position).arcAlt * 1)
        .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
        .arcDashLength(defaultProps.arcLength)
        .arcDashInitialGap((e: object) => (e as unknown as Position).order * 1)
        .arcDashGap(15)
        .arcDashAnimateTime(() => defaultProps.arcTime);

      // Set points data with fixed type cast
      globeRef.current
        .pointsData(filteredPoints)
        .pointColor((e: object) => (e as unknown as PointData).color)
        .pointsMerge(true)
        .pointAltitude(0.0)
        .pointRadius(2);

      // Initialize with empty rings
      globeRef.current
        .ringsData([])
        .ringColor(() => defaultProps.polygonColor)
        .ringMaxRadius(defaultProps.maxRings)
        .ringPropagationSpeed(RING_PROPAGATION_SPEED)
        .ringRepeatPeriod(
          (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings
        );
    } catch (error) {
      console.error("Error building globe data:", error);
    }
  }, [
    isInitialized,
    data,
    defaultProps.pointSize,
    defaultProps.showAtmosphere,
    defaultProps.atmosphereColor,
    defaultProps.atmosphereAltitude,
    defaultProps.polygonColor,
    defaultProps.arcLength,
    defaultProps.arcTime,
    defaultProps.rings,
    defaultProps.maxRings,
  ]);

  // Handle rings animation with cleanup
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const interval = setInterval(() => {
      if (!globeRef.current) return;

      try {
        const rings = [];
        const numRings = defaultProps.rings || 1;

        for (let i = 0; i < numRings; i++) {
          const alt = Math.random() * 0.1;
          const lat = Math.random() * 180 - 90;
          const lng = Math.random() * 360 - 180;

          rings.push({
            lat,
            lng,
            altitude: alt,
            color: ["#61DAFB", "#FB61DA", "#DAFB61", "#61FBCF"][
              Math.round(Math.random() * 3)
            ],
          });
        }

        globeRef.current.ringsData(rings);
      } catch (error) {
        console.error("Error updating rings:", error);
      }
    }, defaultProps.arcTime / 3);

    return () => clearInterval(interval);
  }, [
    isInitialized,
    data,
    defaultProps.arcLength,
    defaultProps.arcTime,
    defaultProps.rings,
  ]);

  return (
    <group ref={groupRef} rotation={[0, 0, 0]}>
      {/* Globe is initialized imperatively */}
    </group>
  );
}

function WebGLRendererConfig() {
  const { gl } = useThree();

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setClearColor(0xffffff, 0);
  }, [gl]);

  return null;
}

export function World(props: WorldProps) {
  const initialCameraPosition = useMemo(
    () => [
      ((props.globeConfig.initialPosition?.lng ?? 0) * Math.PI) / 180, // Convert to radians for THREE.js
      ((props.globeConfig.initialPosition?.lat ?? 0) * Math.PI) / 180,
      300, // Initial distance - increased from 200 to 300
    ],
    [
      props.globeConfig.initialPosition?.lat,
      props.globeConfig.initialPosition?.lng,
    ]
  );

  const cameraPositionVector = useMemo(() => {
    const phi = initialCameraPosition[0];
    const theta = initialCameraPosition[1];
    const r = initialCameraPosition[2];

    const x = r * Math.sin(theta) * Math.sin(phi);
    const y = r * Math.cos(theta);
    const z = r * Math.sin(theta) * Math.cos(phi);

    return new Vector3(x, y, z);
  }, [initialCameraPosition]);

  return (
    <Canvas
      style={{ width: "100%", height: "100%", background: "transparent" }}
      camera={{
        fov: 40, // Reduced from 45 to 40 for a more zoomed out view
        aspect: aspect,
        near: 0.1,
        far: 2000, // Increased from 1000 to 2000
        position: cameraPositionVector,
      }}
      dpr={typeof window !== "undefined" ? window.devicePixelRatio : 1}
    >
      <ambientLight intensity={props.globeConfig.ambientLight ? 1 : 0.2} />
      <spotLight
        intensity={props.globeConfig.directionalLeftLight ? 1 : 0.1}
        angle={0.4}
        penumbra={1}
        position={[600, 200, 20]}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={200} // Increased from 120 to 200
        maxDistance={800} // Increased from 500 to 800
        autoRotate={props.globeConfig.autoRotate}
        autoRotateSpeed={props.globeConfig.autoRotateSpeed || 0.5}
      />
      <Globe {...props} />
      <WebGLRendererConfig />
    </Canvas>
  );
}
