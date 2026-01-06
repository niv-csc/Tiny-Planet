import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore, PlacedElement, PlanetEmotion } from '@/store/gameStore';

interface PlanetMeshProps {
  emotion: PlanetEmotion;
  placedElements: PlacedElement[];
  onPlaceElement: (position: { x: number; y: number; z: number }) => void;
  selectedElement: string | null;
}

const getEmotionColor = (emotion: PlanetEmotion): THREE.Color => {
  const colors: Record<PlanetEmotion, string> = {
    happy: '#06D6A0',
    content: '#FFD166',
    worried: '#F4A261',
    angry: '#E63946',
    crying: '#4A90D9',
    dying: '#666666',
  };
  return new THREE.Color(colors[emotion]);
};

const ElementMarker = ({ element }: { element: PlacedElement }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 2 + element.position.x) * 0.02;
    }
  });

  const getElementColor = (type: string): string => {
    const colors: Record<string, string> = {
      tree: '#2D5A27',
      factory: '#4A5568',
      river: '#3B82F6',
      mountain: '#78716C',
      farmer: '#D97706',
      scientist: '#7C3AED',
      educator: '#EC4899',
      builder: '#F59E0B',
      healer: '#10B981',
    };
    return colors[type] || '#ffffff';
  };

  const getElementShape = (type: string) => {
    switch (type) {
      case 'tree':
        return <coneGeometry args={[0.08, 0.15, 8]} />;
      case 'factory':
        return <boxGeometry args={[0.1, 0.12, 0.1]} />;
      case 'river':
        return <torusGeometry args={[0.06, 0.02, 8, 16]} />;
      case 'mountain':
        return <coneGeometry args={[0.1, 0.18, 4]} />;
      default:
        return <sphereGeometry args={[0.05, 8, 8]} />;
    }
  };

  const normalizedPos = new THREE.Vector3(
    element.position.x,
    element.position.y,
    element.position.z
  )
    .normalize()
    .multiplyScalar(1.05);

  return (
    <mesh ref={meshRef} position={[normalizedPos.x, normalizedPos.y, normalizedPos.z]}>
      {getElementShape(element.type)}
      <meshStandardMaterial
        color={getElementColor(element.type)}
        emissive={getElementColor(element.type)}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

const PlanetMesh = ({ emotion, placedElements, onPlaceElement, selectedElement }: PlanetMeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { camera, raycaster, pointer } = useThree();
  const [hoverPoint, setHoverPoint] = useState<THREE.Vector3 | null>(null);

  const planetColor = useMemo(() => getEmotionColor(emotion), [emotion]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;

      if (emotion === 'worried' || emotion === 'angry') {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 5) * 0.02;
        meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 5) * 0.02;
      }

      if (emotion === 'happy') {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
        meshRef.current.scale.setScalar(scale);
      }
    }

    if (glowRef.current) {
      glowRef.current.rotation.y -= 0.001;
      const glowScale = 1.15 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
      glowRef.current.scale.setScalar(glowScale);
    }
  });

  const handlePointerMove = () => {
    if (selectedElement && meshRef.current) {
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(meshRef.current);
      if (intersects.length > 0) {
        setHoverPoint(intersects[0].point);
      }
    }
  };

  const handleClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    if (selectedElement && meshRef.current) {
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(meshRef.current);
      if (intersects.length > 0) {
        const point = intersects[0].point;
        onPlaceElement({ x: point.x, y: point.y, z: point.z });
      }
    }
  };

  return (
    <group>
      <Sphere ref={glowRef} args={[1.1, 32, 32]}>
        <meshBasicMaterial
          color={planetColor}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      <Sphere
        ref={meshRef}
        args={[1, 64, 64]}
        onClick={handleClick}
        onPointerMove={handlePointerMove}
      >
        <meshStandardMaterial
          color={planetColor}
          roughness={0.6}
          metalness={0.1}
          emissive={planetColor}
          emissiveIntensity={emotion === 'happy' ? 0.2 : 0.05}
        />
      </Sphere>

      {/* ✅ Safe guard added here */}
      {(placedElements ?? []).map((element) => (
        <ElementMarker key={element.id} element={element} />
      ))}

      {hoverPoint && selectedElement && (
        <mesh position={hoverPoint.clone().normalize().multiplyScalar(1.02)}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>
      )}

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.02, 8, 64]} />
        <meshBasicMaterial color={planetColor} transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

const Planet = () => {
  const { emotion, placedElements, selectedElement, placeElement } = useGameStore();

  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#4A90D9" />
        <pointLight position={[0, 3, 0]} intensity={0.5} color="#FFD166" />

        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

        <PlanetMesh
          emotion={emotion}
          placedElements={placedElements}
          selectedElement={selectedElement}
          onPlaceElement={placeElement}
        />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2.5}
          maxDistance={6}
          autoRotate={!selectedElement}
          autoRotateSpeed={0.5}
          dampingFactor={0.05}
          enableDamping
        />
      </Canvas>
    </div>
  );
};

export default Planet;