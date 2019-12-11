<template>
<section id="memoview">
   <div v-if="this.memoId">
       <b-button v-if="!this.isTop" @click="$router.push('/memos/'+nowPage+'/')" style="margin-right:20px">&lt;</b-button>
       <b-button @click="$router.push('/memos/edit/'+nowPage+'/'+memoId)" type="is-success" outlined>Edit</b-button>
       <b-button @click="delConfirm" type="is-danger" outlined style="margin-left:10px">Delete</b-button>
   <hr />
   </div>

   <p>Last modified: {{ lastModified }}</p>
   <hr>
   <pre>{{ textData }}</pre>

</section>
</template>

<script>
import MemoDB from '~/assets/js/MemoDB';

export default {
    props: [
        'memoId', 'lastModified', 'textData', 'isTop', 'nowPage'
    ],

    methods: {
        delConfirm() {
            const that = this;
            this.$buefy.dialog.confirm({
                title: 'メモの削除確認',
                message: 'このメモを削除します。',
                confirmText: 'OK',
                type: 'is-danger',
                hasIcon: true,
                props: {memoId:this.memoId},
                onConfirm: async function() {
                    var db = await MemoDB.connect();
                    db.remove(this.props.memoId);
                    that.$router.push('/memos/1/?removed=1');
                }
            });
        }
    }
}
</script>

<style scoped>
</style>

