<template>
  <section id="hero">
    <div class="white-background">
      <v-container class="pt-16">
        <!-- Product Hunt Badge -->
        <v-row justify="center" class="mb-3">
          <v-col cols="12" sm="8" md="6" lg="5" class="text-center">
            <v-sheet
              color="white"
              class="d-inline-block pa-3 rounded-lg mx-auto featured-badge"
              max-width="300"
              elevation="0"
            >
              <div class="d-flex align-center">
                <v-avatar size="36" color="#f64b44" class="mr-3">
                  <span class="text-white font-weight-bold">Q</span>
                </v-avatar>
                <div class="text-left">
                  <div class="text-caption text-body-2  grey-text text--darken-1">question</div>
                  <div class="text-subtitle-1 font-weight-bold red--text text--darken-1">题目数量</div>
                </div>
                <v-spacer class="mr-2"></v-spacer>
                <div class="d-flex flex-column align-center">
                  <IconTriangle size="18" color="#f64b44" />
                  <span class="text-subtitle-1" style="color: #f64b44;">1000+</span>
                </div>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
        
        <!-- Main Title with Gradient Text -->
        <v-row justify="center" class="mt-6">
          <v-col cols="12" class="text-center">
            <h1 class="mega-title gradient-text mb-6">
              AI题库问答系统
            </h1>
          </v-col>
        </v-row>
        
        <!-- Subtitle -->
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6" class="text-center">
            <h3 class="subtitle-text my-6">
              <span ref="typewriter" class="typewriter"></span>
              <span class="cursor" :class="{ 'typing': isTyping }">|</span>
            </h3>
          </v-col>
        </v-row>
        
        <!-- Action Button -->
        <v-row justify="center" class="mt-8">
          <v-col cols="12" class="text-center">
            <button class="cosmic-button" @click="router.push('/question')">
              <span class="star-decoration star-1"></span>
              <span class="star-decoration star-2"></span>
              <span class="star-decoration star-3"></span>
              <span class="star-decoration star-4"></span>
              <span class="star-decoration star-5"></span>
              <span class="star-decoration star-6"></span>
              <span class="star-decoration star-7"></span>
              <span class="star-decoration star-8"></span>
              <span class="btn-content">开始使用</span>
              <span class="btn-icon">→</span>
            </button>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <Features />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import Features from './components/Features.vue';
import { IconTriangle } from '@tabler/icons-vue';

// 路由
const router = useRouter();

// 打字机效果逻辑
const typewriter = ref<HTMLElement | null>(null);
const isTyping = ref(true);
const textArray = [
  "题库包含1000+道面试题，覆盖后端，前端，测试，产品，运营，设计，销售，管理等多个领域，帮助你快速提升面试能力。",
  "定制化面试流程，根据你的求职目标和经验水平，生成个性化面试题和答案。",
  "智能评分系统，对你的回答进行分析和评分，帮助你快速找出不足并改进。",
  "专业面试官点评，提供详细的答案解析和改进建议，让你的回答更加专业。"
];
let currentTextIndex = 0;
let typeTimer: number | null = null;
let eraseTimer: number | null = null;
let pauseTimer: number | null = null;
let cursorTimer: number | null = null;
let currentIndex = 0;
const typingSpeed = 80; // 打字速度
const eraseSpeed = 30; // 删除速度
const pauseDuration = 1500; // 完成打字后暂停时间
const textSwitchPause = 800; // 完成删除后切换文本前的暂停时间

// 执行打字效果
const typeText = () => {
  if (typewriter.value && currentIndex <= textArray[currentTextIndex].length) {
    isTyping.value = true;
    typewriter.value.textContent = textArray[currentTextIndex].slice(0, currentIndex);
    currentIndex++;
    typeTimer = setTimeout(typeText, typingSpeed);
  } else {
    // 打字完成后暂停一段时间，然后开始删除
    pauseTimer = setTimeout(() => {
      eraseText();
    }, pauseDuration);
  }
};

// 删除文本效果
const eraseText = () => {
  if (typewriter.value && currentIndex > 0) {
    isTyping.value = true;
    currentIndex--;
    typewriter.value.textContent = textArray[currentTextIndex].slice(0, currentIndex);
    eraseTimer = setTimeout(eraseText, eraseSpeed);
  } else {
    // 删除完成后，切换到下一段文本
    pauseTimer = setTimeout(() => {
      currentTextIndex = (currentTextIndex + 1) % textArray.length;
      typeText();
    }, textSwitchPause);
  }
};

// 开始打字机循环
const startTypewriterLoop = () => {
  if (cursorTimer) clearInterval(cursorTimer);
  if (typeTimer) clearTimeout(typeTimer);
  if (eraseTimer) clearTimeout(eraseTimer);
  if (pauseTimer) clearTimeout(pauseTimer);
  
  isTyping.value = true;
  currentIndex = 0;
  
  // 开始光标闪烁
  cursorTimer = setInterval(() => {
    isTyping.value = !isTyping.value;
  }, 500);
  
  // 开始打字效果
  typeText();
};

// 光标闪烁效果
const startCursorBlink = () => {
  cursorTimer = setInterval(() => {
    isTyping.value = !isTyping.value;
  }, 500); // 光标闪烁速度
};

onMounted(() => {
  // 开始打字效果循环
  setTimeout(() => {
    startTypewriterLoop();
  }, 500); // 延迟开始打字
});

onBeforeUnmount(() => {
  // 清理所有定时器
  if (cursorTimer) clearInterval(cursorTimer);
  if (typeTimer) clearTimeout(typeTimer);
  if (eraseTimer) clearTimeout(eraseTimer);
  if (pauseTimer) clearTimeout(pauseTimer);
});
</script>

<style scoped>
.typewriter {
  display: inline;
}

.cursor {
  display: inline-block;
  margin-left: 2px;
  width: 3px;
  color: #7b4bff;
  font-weight: bold;
  animation: blink 0.7s infinite;
}

.cursor.typing {
  animation: none;
  opacity: 1;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.white-background {
  background: #ffffff;
  min-height: calc(100vh - 70px);
  width: 100%;
  position: relative;
  padding-bottom: 60px;
}

.featured-badge {
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.mega-title {
  font-size: clamp(2.5rem, 7vw, 5rem) !important;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-transform: none;
  margin-bottom: 1rem;
}

.gradient-text {
  background: linear-gradient(90deg, #7b4bff 0%, #e9469a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
}

.subtitle-text {
  color: #666;
  font-weight: 400;
  line-height: 1.6;
  font-size: 1.25rem;
}

.cosmic-button {
  background: linear-gradient(90deg, #7b4bff 0%, #e9469a 100%);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 18px 40px;
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  overflow: visible;
  transition: all 0.3s ease;
  box-shadow: 0 8px 30px rgba(123, 75, 255, 0.3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.cosmic-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(123, 75, 255, 0.4), 0 0 15px rgba(233, 70, 154, 0.3);
}

.cosmic-button:active {
  transform: translateY(1px);
}

.btn-content {
  z-index: 1;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.btn-icon {
  margin-left: 10px;
  font-weight: bold;
  transition: transform 0.3s ease;
  display: inline-block;
  font-size: 1.25rem;
}

.cosmic-button:hover .btn-icon {
  transform: translateX(4px);
}

.cosmic-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #e9469a 0%, #7b4bff 100%);
  border-radius: 50px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cosmic-button:hover::before {
  opacity: 1;
}

@media (max-width: 600px) {
  .mega-title {
    font-size: 2.2rem !important;
    letter-spacing: -0.01em;
  }
  
  .subtitle-text {
    font-size: 1rem;
  }
  
  .cosmic-button {
    padding: 15px 30px;
    font-size: 1rem;
  }
  
  /* 移动设备上调整星星大小和位置 */
  .star-decoration {
    width: 8px;
    height: 8px;
  }
  
  .cosmic-button:hover .star-1 {
    --tx: -15px;
    --ty: -20px;
  }
  
  .cosmic-button:hover .star-2 {
    --tx: -25px;
    --ty: 0px;
  }
  
  .cosmic-button:hover .star-3 {
    --tx: -15px;
    --ty: 20px;
  }
  
  .cosmic-button:hover .star-4 {
    --tx: 15px;
    --ty: -20px;
  }
  
  .cosmic-button:hover .star-5 {
    --tx: 25px;
    --ty: 0px;
  }
  
  .cosmic-button:hover .star-6 {
    --tx: 15px;
    --ty: 20px;
  }
  
  .cosmic-button:hover .star-7 {
    --tx: -20px;
    --ty: -10px;
  }
  
  .cosmic-button:hover .star-8 {
    --tx: 20px;
    --ty: -10px;
  }
}

/* 星星装饰样式 */
.star-decoration {
  position: absolute;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  width: 12px;
  height: 12px;
  z-index: 0;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px rgba(123, 75, 255, 0.5);
  opacity: 0;
}

/* 为不同星星设置不同颜色 */
.star-1 {
  top: -8px;
  left: 15%;
  background: #7b4bff;
}

.star-2 {
  top: 50%;
  left: -8px;
  background: #e9469a;
}

.star-3 {
  bottom: -8px;
  left: 25%;
  background: #7b4bff;
}

.star-4 {
  top: -8px;
  right: 15%;
  background: #e9469a;
}

.star-5 {
  top: 50%;
  right: -8px;
  background: #7b4bff;
}

.star-6 {
  bottom: -8px;
  right: 25%;
  background: #e9469a;
}

.star-7 {
  top: 20%;
  left: -5px;
  background: linear-gradient(45deg, #7b4bff, #e9469a);
}

.star-8 {
  top: 20%;
  right: -5px;
  background: linear-gradient(135deg, #e9469a, #7b4bff);
}

/* 星星初始状态下的显示 */
.cosmic-button .star-decoration {
  opacity: 0;
  transform: scale(1);
}

/* 定义撒花动画 */
@keyframes scatter {
  0% {
    opacity: 0;
    transform: scale(0.8) translate(0, 0);
    box-shadow: 0 0 5px rgba(123, 75, 255, 0.5);
  }
  15% {
    opacity: 0.9;
    transform: scale(1) translate(0, 0);
    box-shadow: 0 0 8px rgba(123, 75, 255, 0.7);
  }
  100% {
    opacity: 0;
    transform: scale(1.2) translate(var(--tx, 0), var(--ty, 0));
    box-shadow: 0 0 2px rgba(123, 75, 255, 0.3);
  }
}

/* 悬停时的星星显示 */
.cosmic-button:hover .star-decoration {
  opacity: 0; /* 初始为0，通过动画显示 */
}

/* 悬停时的撒花效果 */
.cosmic-button:hover .star-1 {
  --tx: -20px;
  --ty: -30px;
  animation: scatter 0.8s ease-out forwards;
}

.cosmic-button:hover .star-2 {
  --tx: -40px;
  --ty: 0px;
  animation: scatter 0.7s ease-out forwards;
}

.cosmic-button:hover .star-3 {
  --tx: -20px;
  --ty: 30px;
  animation: scatter 0.9s ease-out forwards;
}

.cosmic-button:hover .star-4 {
  --tx: 20px;
  --ty: -30px;
  animation: scatter 0.8s ease-out forwards;
}

.cosmic-button:hover .star-5 {
  --tx: 40px;
  --ty: 0px;
  animation: scatter 0.7s ease-out forwards;
}

.cosmic-button:hover .star-6 {
  --tx: 20px;
  --ty: 30px;
  animation: scatter 0.9s ease-out forwards;
}

.cosmic-button:hover .star-7 {
  --tx: -30px;
  --ty: -10px;
  animation: scatter 0.85s ease-out 0.1s forwards;
}

.cosmic-button:hover .star-8 {
  --tx: 30px;
  --ty: -10px;
  animation: scatter 0.85s ease-out 0.15s forwards;
}
</style>
