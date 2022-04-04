<template>
    <div class="main-panel">
            <div class="content-wrapper">
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Data User</h4>
                        <a class="btn btn-success mdi mdi-account-plus text-dark" v-b-modal.modal_user @click="Add()">Tambah User</a>
                        <table class="table text-light">
                            <tr>
                                <td>ID</td>
                                <td>Nama</td>
                                <td>Username</td>
                                <td>Role</td>
                                <td>Outlet</td>
                                <td>AKSI</td>
                            </tr>
                            <tr v-for="(ser, index) in user" :key="index">
                                <td>{{ index + 1 }}</td>
                                <td>{{ ser.nama }}</td>
                                <td>{{ ser.username}}</td>
                                <td>{{ ser.role }}</td>
                                <td>{{ ser.outlet.nama_outlet }}</td>
                                <td>
                                    <a v-b-modal.modal_user href="#" class="btn btn-outline-warning mdi mdi-pencil" @click="Edit(ser)"></a>
                                    <a href="#" class="btn btn-outline-danger mdi mdi-delete-forever" @click="Delete(ser.id)"></a>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
    

        <b-modal 
            id="modal_user" 
            ref="modal" 
            title="Form User" 
            size="md" 
            @ok="Save">
            <form>
                <div class="form-floating mb-3 mb-md-0">
                    <input v-model="nama" placeholder="Enter your first name" v-modal="nama" id="inputNama" class="form-control" type="text"/>
                    <label for="inputNama">Nama</label>
                </div>
                <div class="form-floating mb-3 mb-md-0">
                    <input v-model="username" placeholder="Enter your first name" v-modal="username" id="inputUsername" class="form-control" type="text"/>
                    <label for="inputUsername">Username</label>
                </div>
                <div class="form-floating mb-3 mb-md-0">
                    <input v-model="password" placeholder="Enter your first name" v-modal="password" id="inputPassword" class="form-control" type="password"/>
                    <label for="inputPassword">Password</label>
                </div>
                <div class="form-floating mb-3 mb-md-0">
                    <select v-model="role" class="form-control text-light">
                         <option value="">--Pilih Role---</option>
                         <option value="admin">Admin</option>
                         <option value="owner">Owner</option>
                         <option value="kasir">Kasir</option>
                    </select>

                    <label for="inputRole">Role</label>
                </div>
                <div class="form-group">
            <label for="id_outlet" class="col-form-label">Outlet</label>
            <b-form-select class="form-control text-light" v-model="id_outlet" :options="data_outlet"></b-form-select>
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
            nama: "",
            username:"",
            password:"",
            role:"",
            user: [],
            data_outlet: [],
            action: ""
        }
    },
    methods: {
        getData: function(){
            let config = {
                headers : {
                "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                }
            }

          axios.get(base_url + '/user', config)
          .then( response => {
              console.log(response);
            if(response.data.success == true){
                this.user = response.data.data.user;
            }
          })

        },
        OutletDropdown: function () {
      let config = {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("Authorization"),
        },
      };
      axios.get(base_url + "/outlet", config).then((response) => {
        let json_outlet = response.data.data.outlet;
        let list_outlet = [
          {
            value: "",
            text: "--Pilih Outlet--",
          },
        ];
        json_outlet.forEach((element) => {
          list_outlet.push({
            value: element.id_outlet,
            text: element.nama_outlet,
          });
        });
        this.data_outlet = list_outlet;
      });
    },

        Add: function(){
            this.action = "insert";
            this.id_outlet = "";
            this.id = "";
            this.nama = "";
            this.username = "";
            this.password = "";
            this.role = "";
        },
        Edit: function(item){
            this.action = "update";
            this.id_outlet = item.id_outlet;
            this.id = item.id;
            this.nama = item.nama;
            this.username = item.username;
            this.role = item.role;
        },
        Save: function(){
            let config = {
                headers : {
                "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                }
            }

            let form = {
                "id_outlet": this.id_outlet,
                "nama": this.nama,
                "username": this.username,
                "password": this.password,
                "role": this.role,
            }

            //logika method post/get (insert /update)
            if(this.action == "insert"){
                axios.post(base_url + '/user', form, config)
                .then( response => {
                    alert(response.data.message);
                })
                .catch(error => {
                console.log(error);
                });
            } else { //update
                axios.put(base_url + '/user/' + this.id, form, config)
                .then( response => {
                    alert(response.data.message);
                })
                .catch(error => {
                console.log(error);
                });
            }
            
            this.getData();
            
        },
        Delete: function(id){
           if(confirm("Apakah anda yakin menghapus data user ini?")){

                let config = {
                    headers : {
                    "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                    }
                }

                axios.delete(base_url + '/user/' + id, config)
                .then( response => {
                    alert(response.data.message);
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
        this.OutletDropdown();
    },
}
</script>