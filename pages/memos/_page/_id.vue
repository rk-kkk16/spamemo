<template>
<section id="wrapper">
   <my-menu nowMemos=true />

   <section class="main-content columns">
      <div class="container column is-12">
         <section class="section">
            <div>
               <memo-view :memoId="memoId" :lastModified="lastModified" :textData="textData" :nowPage="nowPage"/>
            </div>
         </section>
      </div>
   </section>
</section>
</template>

<script>
import myMenu from "~/components/Menu.vue";
import memoView from "~/components/MemoView.vue";
import MemoDB from '~/assets/js/MemoDB';

export default {
    name: 'MemoDetail',

    data: function() {
        return {
            nowPage: this.$route.params.page
        };
    },

    async asyncData(context) {
        var db = await MemoDB.connect();
        var memo = await db.get(parseInt(context.params.id));
        var memoId = -1;
        var lastModified = '--';
        var textData = 'nothing to show';

        if (memo != null) {
            memoId = memo.id;
            console.log(memo);
            var spldata = memo.rawdata.split(';', 3);
            if (spldata[1]) { lastModified = spldata[1]; }
            if (spldata[2]) { textData = spldata[2]; }
        }

        return {
            memoId: memoId,
            lastModified: lastModified,
            textData: textData
        };
    },

    components: {
        myMenu,
        memoView
    },
}
</script>
