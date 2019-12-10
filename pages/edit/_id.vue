<template>
<section id="wrapper">
   <div v-if="$route.params.id==0"><my-menu nowNew=true /></div>
   <div v-else><my-menu nowMemos=true /></div>

   <section class="main-content columns">
      <div class="container column is-12">
         <section class="section">
            <div>
               <edit-view :memoId="memoId" :inptxt="inptxt" :created="created"/>
            </div>
         </section>
      </div>
   </section>
</section>
</template>

<script>
import myMenu from '~/components/Menu.vue';
import editView from '~/components/EditView.vue';
import MemoDB from '~/assets/js/MemoDB';

export default {
    name: 'Top',

    components: {
        myMenu,
        editView
    },

    async asyncData(context) {
        var db = await MemoDB.connect();
        var memo = await db.get(parseInt(context.params.id));
        var res = {
            memoId: 0,
            inptxt: '',
            created: ''
        };
        if (memo.id != 0) {
            res.memoId = memo.id;
            var spldata = memo.rawdata.split(';', 3);
            res.created = spldata[1];
            res.inptxt = spldata[2];
        }
        return res;
    },
}
</script>
