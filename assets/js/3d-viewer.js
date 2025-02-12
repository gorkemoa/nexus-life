// Three.js kurulumu
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('three-canvas');
    const container = document.getElementById('3d-viewer');
    
    if (!canvas || !container) {
        console.warn('3D viewer elemanları henüz yüklenmedi');
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / 600, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });

    renderer.setSize(container.offsetWidth, 600);
    renderer.setClearColor(0xf8f9fa);

    // Işıklandırma
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Kontroller
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Model yükleme
    const mtlLoader = new THREE.MTLLoader();
    const objLoader = new THREE.OBJLoader();

    mtlLoader.load('assets/base.mtl', function(materials) {
        materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load('assets/base.obj', function(object) {
            scene.add(object);
            // Modeli merkeze yerleştir
            const box = new THREE.Box3().setFromObject(object);
            const center = box.getCenter(new THREE.Vector3());
            object.position.sub(center);
            // Kamerayı konumlandır
            camera.position.z = 5;
            camera.position.y = 2;
        });
    });

    // Animasyon döngüsü
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    // Sayfa yüklendiğinde başlat
    animate();
    
    // Kontrol butonları
    document.getElementById('toggle-light').addEventListener('click', function() {
        if (directionalLight.intensity === 0.8) {
            directionalLight.intensity = 0.2;
            ambientLight.intensity = 0.2;
        } else {
            directionalLight.intensity = 0.8;
            ambientLight.intensity = 0.5;
        }
    });

    document.getElementById('reset-camera').addEventListener('click', function() {
        camera.position.set(0, 2, 5);
        controls.reset();
    });

    // Pencere yeniden boyutlandırma
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
        camera.aspect = container.offsetWidth / 600;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, 600);
    }
}); 