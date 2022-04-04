<template>
    <div class="main-panel">
            <div class="content-wrapper">
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Data Paket</h4>
                        <a class="btn btn-success mdi mdi-database-plus text-dark" v-b-modal.modal_paket @click="Add()">Tambah Paket</a>
                        <table class="table text-light">
                            <tr>
                                <td>ID</td>
                                <td>Jenis Paket</td>
                                <td>Harga</td>
                                <td>AKSI</td>
                            </tr>
                            <tr v-for="(pak, index) in paket" :key="index">
                                <td>{{ index + 1 }}</td>
                                <td class="text-light">
                                    <span
                                    v-if="pak.jenis === 'kiloan'"
                                    >Kiloan</span
                                    >
                                    <span
                                    v-if="pak.jenis === 'kaos'"
                                    >Kaos</span
                                    >
                                    <span
                                    v-if="pak.jenis === 'selimut'"
                                    >Selimut</span
                                    >
                                    <span
                                    v-if="pak.jenis === 'bed_cover'"
                                    >Bed Cover</span
                                    >
                                <td>{{ pak.harga }}</td>
                                <td>
                                    <a v-b-modal.modal_paket href="#" class="btn btn-outline-warning mdi mdi-pencil" @click="Edit(pak)"></a>
                                    <a href="#" class="btn btn-outline-danger mdi mdi-delete-forever" @click="Delete(pak.id_paket)"></a>
                                </td>
                            </tr>
                        </table>

                        <b-toast id="message" title="Message">
                  <strong class="text-success">{{ message }}</strong>
                </b-toast>

                    </div>
                </div>
            </div>

        <b-modal 
            id="modal_paket" 
            ref="modal" 
            title="Form paket" 
            size="md" 
            @ok="Save">
            <form>
                <div class="form-floating mb-3 mb-md-0">
                    <select v-model="jenis" class="form-control text-light">
                        <option value="kiloan">Kiloan</option>
                        <option value="selimut">Selimut</option>
                        <option value="kaos">Kaos</option>
                        <option value="bed_cover">Bed Cover</option>
                    </select>

                    <label for="inputjenis">Jenis Paket</label>
                </div>
                <div class="form-floating mb-3 mb-md-0">
                    <input v-model="harga" placeholder="Enter your first name" v-modal="harga" id="inputharga" class="form-control text-light" type="text"/>
                    <label for="inputharga">harga</label>
                </div>
            </form>
        </b-modal>
    </div>
</template>
<script>
module.exports =  {
    data: function(){
        return {
            id_paket: "",
            jenis: "",
            harga: "",
            paket: [],
            action:"",
            message: "",
        }
    },
    methods: {
        getData: function(){
            let config = {
                headers : {
                "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                }
            }

          axios.get(base_url + '/paket', config)
          .then( response => {
              console.log(response);
            if(response.data.success == true){
                this.paket = response.data.data.paket;
            } else {
          this.componentName = 'login';
          window.location = front_url;
        }
          })

        },
        Add: function(){
            this.action = "insert";
            this.id_paket = "";
            this.jenis = "";
            this.harga = "";
        
        },
        Edit: function(item){
            this.action = "update";
            this.id_paket = item.id_paket;
            this.jenis = item.jenis;
            this.harga = item.harga;
            
        },
        Save: function(){
            let config = {
                headers : {
                "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                }
            }

            let form = {
                "jenis": this.jenis,
                "harga": this.harga,
            }

            //logika method post/get (insert /update)
            if(this.action == "insert"){
                axios.post(base_url + '/paket', form, config)
                .then( response => {
                   this.getData();
          this.message = response.data.message;
          this.$bvToast.show("message");
                })
                .catch(error => {
          console.log(error);
        });
            } else { //update
                axios.put(base_url + '/paket/' + this.id_paket, form, config)
                .then( response => {
                    this.getData();
          this.message = response.data.message;
          this.$bvToast.show("message");
                })
                .catch(error => {
          console.log(error);
        });
            }
            
            
            
        },
        Delete: function(id){
           if(confirm("Apakah anda yakin menghapus data paket ini?")){

                let config = {
                    headers : {
                    "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                    }
                }

                axios.delete(base_url + '/paket/' + id, config)
                .then( response => {
                    this.getData();
          this.message = response.data.message;
          this.$bvToast.show("message");
                })

                
           }

           
        }

    },
    mounted() {
        this.getData();
    },
}
</script>