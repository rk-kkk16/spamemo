<template>
<section id="wrapper">
   <my-menu nowTop=true />

   <section class="main-content columns">
      <div class="container column is-12">
         <section class="section">
            <div>
               <top-view :memoId="fstMemoId" :lastModified="fstLastModified" :textData="fstTextData" :isTop="isTop" :nowPage="nowPage"/>
            </div>
         </section>
      </div>
   </section>
</section>
</template>

<script>
import myMenu from '~/components/Menu.vue';
import topView from '~/components/MemoView.vue';
import MemoDB from '~/assets/js/MemoDB';

export default {
    name: 'Top',

    async asyncData(context) {
        var db = await MemoDB.connect();
        var fstMemo = await db.getLatest();
        var fstMemoId = 0;
        var fstLastModified = '--';
        var fstTextData = '';
        if (fstMemo) {
            fstMemoId = fstMemo.id;
            var spldata = fstMemo.rawdata.split(';', 3);
            fstLastModified = spldata[1];
            fstTextData = spldata[2];
        }
        return {
            fstMemoId: fstMemoId,
            fstLastModified: fstLastModified,
            fstTextData: fstTextData
        };
    },

    data: function() {
        return {
            isTop: 1,
            nowPage: 1
        };
    },

    components: {
        myMenu,
        topView
    },
}
</script>
