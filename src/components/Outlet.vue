<template>
    <div class="main-panel">
            <div class="content-wrapper">
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Data Outlet</h4>
                        <a class="btn btn-success mdi mdi-store text-dark" v-b-modal.modal_outlet @click="Add()">Tambah outlet</a>
                        <table class="table text-light">
                            <tr>
                                <td>ID</td>
                                <td>Nama Outlet</td>
                                <td>AKSI</td>
                            </tr>
                            <tr v-for="(out, index) in outlet" :key="index">
                                <td>{{ index + 1 }}</td>
                                <td>{{ out.nama_outlet }}</td>
                                <td>
                                    <a v-b-modal.modal_outlet href="#" class="btn btn-outline-warning mdi mdi-pencil" @click="Edit(out)"></a>
                                    <a href="#" class="btn btn-outline-danger mdi mdi-delete-forever" @click="Delete(out.id_outlet)"></a>
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
            id="modal_outlet" 
            ref="modal" 
            title="Form outlet" 
            size="md" 
            @ok="Save">
            <form>
                <div class="form-floating mb-3 mb-md-0">
                    <input v-model="nama_outlet" placeholder="Enter your first name" v-modal="nama_outlet" id="inputnama_outlet" class="form-control text-light" type="text"/>
                    <label for="inputnama_outlet">Nama Outlet</label>
                </div>
            </form>
        </b-modal>
    </div>
</template>
<script>
module.exports =  {
    data: function(){
        return {
            id_outlet: "",
            nama_outlet: "",
            outlet: [],
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

          axios.get(base_url + '/outlet', config)
          .then( response => {
              console.log(response);
            if(response.data.success == true){
                this.outlet = response.data.data.outlet;
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
            this.id_outlet = "";
            this.nama_outlet = "";
        
        },
        Edit: function(item){
            this.action = "update";
            this.id_outlet = item.id_outlet;
            this.nama_outlet = item.nama_outlet;
            
        },
        Save: function(){
            let config = {
                headers : {
                "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                }
            }

            let form = {
                "nama_outlet": this.nama_outlet,
            }

            //logika method post/get (insert /update)
            if(this.action == "insert"){
                axios.post(base_url + '/outlet', form, config)
                .then( response => {
                    this.message = response.data.message;
          this.$bvToast.show("message");
                })
            } else { //update
                axios.put(base_url + '/outlet/' + this.id_outlet, form, config)
                .then( response => {
                    this.message = response.data.message;
          this.$bvToast.show("message");
                })
            }
            
            this.getData();
            
        },
        Delete: function(id){
           if(confirm("Apakah anda yakin menghapus data outlet ini?")){

                let config = {
                    headers : {
                    "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                    }
                }

                axios.delete(base_url + '/outlet/' + id, config)
                .then( response => {
                    this.message = response.data.message;
          this.$bvToast.show("message");
                })

                this.getData();
           }

            // Swal.fire({
            //     title: 'Error!',
            //     text: 'Do you want to continue',
            //     icon: 'error',
            //     confirmButtonText: 'Cool'
            // })
        }

    },
    mounted() {
        this.getData();
    },
}
</script>