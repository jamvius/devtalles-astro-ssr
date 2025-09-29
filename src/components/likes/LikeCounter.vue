<template>
    <div v-if="isLoading">Loading...</div>
    <button v-else-if="likeCount === 0" @click="likePost">Like this post</button>
    <button v-else @click="likePost">Likes <span>{{ likeCount }}</span></button>
    {{ likeClicks }}
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import confetti from 'canvas-confetti';
import debounce from 'lodash.debounce';

interface Props {
    postId: string;
}

const props = defineProps<Props>();

const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

watch(likeCount, debounce(() => {
    fetch(`/api/posts/likes/${props.postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ likes: likeClicks.value })
    })
    likeClicks.value = 0;
}, 500));

const likePost = () => {
    likeCount.value += 1;
    likeClicks.value += 1;

    confetti({
        particleCount: 100,
        spread: 70,
        origin: { 
            x: Math.random(),
            y: Math.random() - 0.2}
    });
};
console.log(props);

const getCurrentLikes = async () => {
    try {
        const response = await fetch(`/api/posts/likes/${props.postId}`);
        const data = await response.json();

        likeCount.value = data.likes; 
        isLoading.value = false;
    } catch (error) {
        console.error("Error fetching likes:", error);
    } finally {
        isLoading.value = false;
    }
};  

getCurrentLikes();
</script>

<style scoped>
    button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }

</style>
