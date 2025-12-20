// Space Animation using Three.js
class SpaceAnimation {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        
        this.init();
    }

    init() {
        // Set up renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);
        
        // Camera position
        this.camera.position.z = 30;

        // Create stars
        this.createStars(5000);
        
        // Create nebula effect
        this.createNebula();
        
        // Add floating particles
        this.createFloatingParticles(100);
        
        // Add a subtle light source
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0x4a6bff, 1, 100);
        pointLight.position.set(10, 10, 10);
        this.scene.add(pointLight);
        
        // Handle window resize
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        
        // Start animation loop
        this.animate();
    }

    createStars(count) {
        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.1,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });

        const starVertices = [];
        
        for (let i = 0; i < count; i++) {
            // Create a sphere of stars
            const radius = 100 + Math.random() * 200;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            starVertices.push(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );
        }

        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        
        const stars = new THREE.Points(starsGeometry, starsMaterial);
        this.scene.add(stars);
        this.stars = stars;
    }

    createNebula() {
        // Create a subtle nebula effect using a particle system
        const nebulaGeometry = new THREE.BufferGeometry();
        const nebulaMaterial = new THREE.PointsMaterial({
            color: 0x4a6bff,
            size: 1.5,
            transparent: true,
            opacity: 0.1,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        });

        const nebulaVertices = [];
        const nebulaCount = 500;
        
        // Create a cloud-like formation
        for (let i = 0; i < nebulaCount; i++) {
            // Create a more organic, cloud-like shape
            const radius = 10 + Math.random() * 40;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            // Add some randomness for a more natural look
            const x = radius * Math.sin(phi) * Math.cos(theta) + (Math.random() - 0.5) * 20;
            const y = radius * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 20;
            const z = radius * Math.cos(phi) + (Math.random() - 0.5) * 20;
            
            nebulaVertices.push(x, y, z);
        }

        nebulaGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nebulaVertices, 3));
        
        const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
        this.scene.add(nebula);
        this.nebula = nebula;
    }

    createFloatingParticles(count) {
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.2,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        });

        const particlesVertices = [];
        this.particlesData = [];
        
        for (let i = 0; i < count; i++) {
            // Random position in a sphere
            const radius = 10 + Math.random() * 40;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            
            particlesVertices.push(x, y, z);
            
            // Store particle data for animation
            this.particlesData.push({
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.01,
                    (Math.random() - 0.5) * 0.01,
                    (Math.random() - 0.5) * 0.01
                ),
                startPosition: new THREE.Vector3(x, y, z),
                timeOffset: Math.random() * Math.PI * 2
            });
        }

        particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlesVertices, 3));
        
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(particles);
        this.particles = particles;
        this.particlesGeometry = particlesGeometry;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.update();
        this.renderer.render(this.scene, this.camera);
    }

    update() {
        const time = Date.now() * 0.0005;
        
        // Rotate stars
        if (this.stars) {
            this.stars.rotation.x = time * 0.05;
            this.stars.rotation.y = time * 0.03;
        }
        
        // Animate nebula
        if (this.nebula) {
            this.nebula.rotation.x = time * 0.01;
            this.nebula.rotation.z = time * 0.02;
        }
        
        // Animate floating particles
        if (this.particles && this.particlesGeometry && this.particlesData) {
            const positions = this.particlesGeometry.attributes.position.array;
            
            for (let i = 0; i < this.particlesData.length; i++) {
                const i3 = i * 3;
                const particle = this.particlesData[i];
                
                // Update position with noise for organic movement
                const timeOffset = time + particle.timeOffset;
                positions[i3] = particle.startPosition.x + Math.sin(timeOffset * 0.5) * 5;
                positions[i3 + 1] = particle.startPosition.y + Math.cos(timeOffset * 0.3) * 5;
                positions[i3 + 2] = particle.startPosition.z + Math.sin(timeOffset * 0.4) * 5;
                
                // Add some drift
                positions[i3] += Math.sin(timeOffset * 0.7) * 0.2;
                positions[i3 + 1] += Math.cos(timeOffset * 0.5) * 0.2;
                positions[i3 + 2] += Math.sin(timeOffset * 0.3) * 0.2;
            }
            
            this.particlesGeometry.attributes.position.needsUpdate = true;
        }
        
        // Slight camera movement
        this.camera.position.x = Math.sin(time * 0.1) * 5;
        this.camera.position.y = Math.cos(time * 0.05) * 2;
        this.camera.lookAt(this.scene.position);
    }
}

// Initialize the animation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create a container for the 3D scene
    const container = document.createElement('div');
    container.id = 'space-animation';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.zIndex = '-1';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);
    
    // Initialize the space animation
    const spaceAnimation = new SpaceAnimation('space-animation');
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (spaceAnimation.onWindowResize) {
            spaceAnimation.onWindowResize();
        }
    });
});
