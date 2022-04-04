<template>

<div class="main-panel">
    <div class="content-wrapper">
    <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Data Member</h4>
                    <a class="btn btn-success mdi mdi-account-plus text-dark" v-b-modal.modal_member @click="Add()">Tambah Member</a>
                <div class="table-responsive">
                        <table class="table text-light">
                            <tr>
                                <td>ID</td>
                                <td>Nama</td>
                                <td>Jenis Kelamin</td>
                                <td>Telp</td>
                                <td>Alamat</td>
                                <td>AKSI</td>
                            </tr>
                            <tr v-for="(mem, index) in member" :key="index">
                                <td>{{ index + 1 }}</td>
                                <td>{{ mem.nama }}</td>
                                <td class="text">
                                    <span
                                    v-if="mem.jenis_kelamin === 'l'"
                                    class="badge badge-outline-primary"
                                    >Laki-Laki</span>
                                    <span
                                    v-if="mem.jenis_kelamin === 'p'"
                                    class="badge badge-outline-danger"
                                    >Perempuan</span>
                                </td>
                                <td>{{ mem.tlp }}</td>
                                <td>{{ mem.alamat }}</td>
                                <td>
                                    <a v-b-modal.modal_member href="#" class="btn btn-outline-warning mdi mdi-pencil" @click="Edit(mem)"></a>
                                    <a href="#" class="btn btn-outline-danger mdi mdi-delete-forever" @click="Delete(mem.id_member)"></a>
                                </td>
                            </tr>
                        </table>
                                <b-toast id="message" title="Message" >
                                    <strong class="text-success">{{ message }}</strong>
                                </b-toast>
                        

                    </div>
                </div>
            </div>
        </div>
        
        
    </div>

        <b-modal 
            id="modal_member" 
            ref="modal" 
            title="Form Member" 
            size="md" 
            @ok="Save">
            <form>
                <div class="form-floating mb-3 mb-md-0">
                    <input v-model="nama" placeholder="Enter your first name" v-modal="nama" id="inputNama" class="form-control text-light" type="text"/>
                    <label for="inputNama">Nama</label>
                </div>
                <div class="form-floating mb-3 mb-md-0">
                    <input v-model="tlp" placeholder="Enter your first name" v-modal="tlp" id="inputTlp" class="form-control text-light" type="text"/>
                    <label for="inputTlp">Telepon</label>
                </div>
                <div class="form-floating mb-3 mb-md-0">
                    <select v-model="jk" class="form-control text-light">
                        <option value="l">Laki-Laki</option>
                        <option value="p">Perempuan</option>
                    </select>

                    <label for="inputJk">Jenis Kelamin</label>
                </div>
                <div class="form-floating mb-3 mb-md-0">
                    <input v-model="alamat" placeholder="Enter your first name" v-modal="alamat" id="inputAlamat" class="form-control text-light" type="text"/>
                    <label for="inputAlamat">Alamat</label>
                </div>
            </form>
        </b-modal>
    </div>
</template>
<script>
module.exports =  {
    data: function(){
        return {
            id_member: "",
            nama: "",
            jk:"",
            tlp:"",
            alamat:"",
            action:"",
            message: "",
            member: []
            
        }
    },
    methods: {
        getData: function(){
            let config = {headers : {"Authorization" : "Bearer " + this.$cookies.get('Authorization')
                }
            }
          axios.get(base_url + '/member', config)
          .then( response => {
            if(response.data.success == true){
                this.member = response.data.data.member;
            } else {
          this.componentName = 'login';
          window.location = front_url;
        }
          })
            .catch(error => {
        console.log(error);
      });

        },
        Add: function(){
            this.action = "insert";
            this.id_member = "";
            this.nama = "";
            this.jk = "";
            this.tlp = "";
            this.alamat = "";
        },
        Edit: function(item){
            this.action = "update";
            this.id_member = item.id_member;
            this.nama = item.nama;
            this.jk = item.jenis_kelamin;
            this.tlp = item.tlp;
            this.alamat = item.alamat;
        },
        Save: function(){
            let config = {headers : {"Authorization" : "Bearer " + this.$cookies.get('Authorization') } }
           
            let form = {
                "nama": this.nama,
                "alamat": this.alamat,
                "jenis_kelamin": this.jk,
                "tlp": this.tlp,
            }

            //logika method post/get (insert /update)
            if(this.action == "insert"){
                axios.post(base_url + '/member', form, config)
                .then( response => {
                    this.getData();
                   this.message = response.data.message;
                  this.$bvToast.show("message");
                })
                 .catch(error => {
          console.log(error);
        });
            } else { //update
                axios.put(base_url + '/member/' + this.id_member, form, config)
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
             let config = {headers : {"Authorization" : "Bearer " + this.$cookies.get('Authorization') } }
           if(confirm("Apakah anda yakin menghapus data member ini?")){
                axios.delete(base_url + '/member/' + id, config)
                .then( response => {
                   if(response.data.success == true){
            this.getData();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
           }
        },

    },
    mounted() {
        this.getData();
    },
}
</script>