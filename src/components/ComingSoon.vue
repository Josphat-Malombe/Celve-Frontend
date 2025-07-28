<template>
    <div class="soon">
        <!-- Background particle effect -->
        <div class="particles"></div>
        
        <!-- Main content -->
        <div class="content">
            <h1>Coming Very Soon!</h1>
            <p>We're building something extraordinary. Stay tuned!</p>
            <!-- Glowing effect -->
            <div class="glow-line"></div>
        </div>
        
        <!-- Floating orbs for futuristic effect -->
        <div class="orb orb-top-left"></div>
        <div class="orb orb-bottom-right"></div>
    </div>
</template>

<script>
export default {
    name: 'ComingSoon'
}
</script>

<style scoped>
.soon {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: linear-gradient(135deg, #1a1a1a, #1e3a8a, #000000);
}

.particles {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 20px 20px;
    animation: subtle-move 10s infinite linear;
}

@keyframes subtle-move {
    0% { background-position: 0 0; }
    100% { background-position: 20px 20px; }
}

.content {
    position: relative;
    z-index: 10;
    text-align: center;
}

.content h1 {
    font-size: 3.5rem;
    font-weight: bold;
    background: linear-gradient(to right, #60a5fa, #a855f7, #ec4899);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: pulse 2s ease-in-out infinite;
}

.content p {
    margin-top: 1rem;
    font-size: 1.25rem;
    color: #d1d5db;
    animation: fade-in 1.5s ease-out;
}

.glow-line {
    margin: 2rem auto;
    height: 4px;
    width: 8rem;
    background: linear-gradient(to right, #3b82f6, #9333ea);
    border-radius: 9999px;
    animation: glow 1.5s ease-in-out infinite;
}

.orb {
    position: absolute;
    border-radius: 50%;
    opacity: 0.3;
    animation: float 4s ease-in-out infinite;
}

.orb-top-left {
    top: 2.5rem;
    left: 2.5rem;
    width: 4rem;
    height: 4rem;
    background: #3b82f6;
}

.orb-bottom-right {
    bottom: 2.5rem;
    right: 2.5rem;
    width: 3rem;
    height: 3rem;
    background: #9333ea;
    animation-delay: 1s;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}

@keyframes fade-in {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
}

@keyframes glow {
    0%, 100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
    50% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.8); }
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

@media (max-width: 768px) {
    .content h1 {
        font-size: 2.5rem;
    }
    .content p {
        font-size: 1rem;
    }
}
</style>