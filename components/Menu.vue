<template>
<section id="menu">
   <button class="button" v-bind:class="{ 'is-primary': nowTop }" @click="$router.push('/')">
      Top
   </button>

   <button class="button" v-bind:class="{ 'is-primary': nowMemos }" @click="$router.push('/memos/1/')">
      Memos
   </button>

   <button class="button" v-bind:class="{ 'is-primary': nowNew }" @click="$router.push('/edit/0')">
      New
   </button>
</section>
</template>

<script>
export default {
   props: {
      nowTop: {
         type:Boolean
      },
      nowMemos: {
         type:Boolean
      },
      nowNew: {
         type:Boolean
      },
   }
}
</script>
