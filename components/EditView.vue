<template>
<section id="editview">
   <div v-if="page">
      <nuxt-link v-bind:to="{name:'memos-page-id',params:{page:page,id:memoId}}"><b-button>&lt;</b-button></nuxt-link>
   <hr />
   </div>

   <b>{{ labeltxt }}</b>
   <b-field id="inptxtarea">
      <b-input type="textarea" v-model="inptxt">{{ inptxt }}</b-input>
   </b-field>
   <div v-if="memoId==0" class="buttons">
      <b-button type="is-primary" @click="saveNewMemo">Save</b-button>
      <b-button type="is-danger" outlined @click="resetMemo">Reset</b-button>
   </div>
   <div v-else class="buttons">
      <b-button type="is-primary" @click="saveMemo">Save</b-button>
      <b-button type="is-danger" outlined @click="resetMemo">Reset</b-button>
   </div>
</section>
</template>

<script>
import MemoDB from '~/assets/js/MemoDB';

export default {
   props: [
       'inptxt', 'memoId', 'created', 'page',
   ],

   data: function() {
       return {
           tmptxt:  this.inptxt, //キャンセル用の前データ
       };
   },

   methods: {
       //新規保存用
       saveNewMemo: async function() {
           var db = await MemoDB.connect();
           var nowtime = this.$ts2date(Math.floor(new Date().getTime() / 1000));
           //created;modified;txtdata... の形で登録する
           var inpdata = nowtime + ';' + nowtime + ';' + this.inptxt;
           db.add({data: inpdata});
           //todo ここで新規発生したidを得られないか
           var newmemo = await db.getLatest();
           if (newmemo.id) {
               this.$router.push('/memos/edit/1/'+newmemo.id+'?saved=new');
           }
       },
       //更新保存用
       saveMemo: async function() {
           var db = await MemoDB.connect();
           var nowtime = this.$ts2date(Math.floor(new Date().getTime() / 1000));
           var inpdata = this.created + ';' + nowtime + ';' + this.inptxt;
           db.update(this.memoId, {data: inpdata});
           console.log("updated");
           this.tmptxt = this.inptxt;
           this.$buefy.toast.open('保存しました。');
       },
       //リセット
       resetMemo: function() {
           this.inptxt = this.tmptxt;
       }
   },

   computed: {
      labeltxt() {
         var labelmsg = "Create new memo.";
         if(this.memoId != 0) {
            labelmsg = "Edit memo.";
         }
         return labelmsg;
      }
   }
}
</script>

<style scoped>
</style>
