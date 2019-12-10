<template>
<section id="wrapper">
   {{ toastRemoved }}
   <my-menu nowMemos=true />

   <section class="main-content columns">
      <div class="container column is-12">
         <section class="section">
            <ul>
                <li v-for="(memo, index) in memos" :memo="memo" key="index" style="margin-bottom:8px">
                <nuxt-link v-bind:to="{name:'memos-page-id',params:{page:$route.params.page,id:memo.id}}">
                {{ memo.lastModified }} | {{ memo.excerpt }}
                </nuxt-link>
                </li>
            </ul>

            <hr />
            <div>
            <b-pagination
                :total="totalCount"
                :current="nowPage"
                :per-page="viewNum"
                :order="order"
                :range-before="rangeBefore"
                :range-after="rangeAfter"
            >
                <b-pagination-button
                    slot-scope="props"
                    :page="props.page"
                    :id="`page${props.page.number}`"
                    tag="router-link"
                    :to="`/memos/${props.page.number}/`"
                >
                </b-pagination-button>
                <b-pagination-button
                    slot="previous"
                    slot-scope="props"
                    :page="props.page"
                    tag="router-link"
                    :to="`/memos/${props.page.number}/`"
                >
                &lt;
                </b-pagination-button>
                <b-pagination-button
                    slot="next"
                    slot-scope="props"
                    :page="props.page"
                    tag="router-link"
                    :to="`/memos/${props.page.number}/`"
                >
                &gt;
                </b-pagination-button>
            </b-pagination>
            </div>
         </section>
      </div>
   </section>
</section>
</template>

<script>
import myMenu from '~/components/Menu.vue';
import MemoDB from '~/assets/js/MemoDB';
var viewNum = 10;

export default {
   name: 'Top',

   async asyncData(context) {
       var nowp = parseInt(context.params.page);
       var offsetFrom = (nowp - 1) * viewNum;
       if (offsetFrom == 0) { offsetFrom = 1; }
       var db = await MemoDB.connect();
       var memos = await db.getFromTo(offsetFrom, viewNum);
       var cnt = await db.getCount();
       return {
           memos: memos,
           totalCount: cnt,
       };
   },

   data: function() {
       return {
           nowPage: parseInt(this.$route.params.page),
           rangeBefore: 2,
           rangeAfter: 2,
           order: 'is-centered',
           viewNum: viewNum,
       };
   },

   components: {
      myMenu,
   },

   computed: {
       //削除から来た時(?removed=1)トーストする
       toastRemoved() {
           if (this.$route.query.removed) {
               this.$buefy.toast.open('メモを削除しました。');
           }
       }
   }
}
</script>
