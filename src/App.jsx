import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Html } from '@react-three/drei';
import { useRef, useState } from 'react';

function Planet() {
  const [hovered, setHovered] = useState(false);
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh
      ref={ref}
      position={[-4, 0, -4]}
      scale={[3, 3, 3]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={hovered ? '#555' : '#888'} />
      {hovered && (
        <Html center distanceFactor={10}>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <h3>Menu</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><a href="#about" style={{ color: 'white' }}>About</a></li>
              <li><a href="#projects" style={{ color: 'white' }}>Projects</a></li>
              <li><a href="#contact" style={{ color: 'white' }}>Contact</a></li>
            </ul>
          </div>
        </Html>
      )}
    </mesh>
  );
}

function SpecialStar() {
  const [boom, setBoom] = useState(false);

  return (
    <mesh
      position={[2, 1, -1]}
      scale={boom ? 5 : 1}
      onClick={() => {
        console.log("💥 Nebula triggered");
        setBoom(true);
        setTimeout(() => setBoom(false), 1000);
      }}
    >
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color={boom ? 'orange' : 'white'} />
    </mesh>
  );
}

function App() {
  return (
    <>
      <Canvas style={{ width: '100vw', height: '100vh', background: 'black' }} camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <Stars radius={100} depth={50} count={1000} factor={4} fade />
        <Planet />
        <SpecialStar />
      </Canvas>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, 150%)',
        color: 'white',
        fontFamily: 'sans-serif',
        textShadow: '0 0 10px #fff, 0 0 20px #ffae00',
        pointerEvents: 'none'
      }}>
        “IN ALL CHAOS THERE IS A COSMOS” – Carl Jung
      </div>
    </>
  );
}

export default App;
