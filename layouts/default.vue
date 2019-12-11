<template>
<div>
   <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
   >
      <div class="navbar-brand">
         <a
            class="navbar-item"
            href="/spamemo/"
         >
            <img
               src="~assets/nyaco.png"
               alt="logo"
               height="28"
            >
         </a>
      </div>
   </nav>

   <nuxt />

   <!-- footer -->
   <footer class="footer">
      <div class="content has-text-centered">
         <p>spamemo by rkwmt.</p>
      </div>
   </footer>
</div>
</template>

<script>
export default {
   data: function() {
      return {
         nowTop: true,
         nowMemos: false,
         nowNew: false
      }
   },

   methods: {
      toTop(e) {
         this.nowMemos = this.nowNew = false;
         this.nowTop = true;
      },
      toMemos(e) {
         this.nowTop = this.nowNew = false;
         this.nowMemos = true;
      },
      toNew(e) {
         this.nowTop = this.nowMemos = false;
         this.nowNew = true;
      },
   }
}
</script>

<style>
.container {
   min-height:calc(100vh - 7.5rem);
}
</style>

