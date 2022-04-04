<template>
<body>
<div>
    <div class="container-scroller">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <div class="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-left fixed-top">
          <a class="navbar-brand ps-3 font-weight-bold text-light" href="index.html">L A U N D R Y</a>
        </div>
        <ul class="nav">
          <li class="nav-item profile">
            <div class="profile-desc">
              <div class="profile-pic">
                <div class="count-indicator">
                  <img class="img-xs rounded-circle " src="src/assets/images/faces-clipart/pic-4.png" alt="">
                  <span class="count bg-success"></span>
                </div>
                <div class="profile-name">
                  <h5 class="mb-0 font-weight-normal">{{ username }}</h5>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item nav-category">
          </li>
          <li class="nav-item menu-items">
            <router-link class="nav-link collapsed text-light" to="/member" v-if="role !== 'owner'">
                <div class="sb-nav-link-icon">
                  <span class="menu-icon">
                  <i class="fas fa-columns mdi mdi-account-multiple "> </i>
                  </span>
                  </div>
                    Member
                </router-link>
          </li>
          <li class="nav-item menu-items">
             <router-link class="nav-link collapsed text-light" to="/user" v-if="role === 'admin'">
                <div class="sb-nav-link-icon">
                  <span class="menu-icon">
                  <i class="fas fa-columns mdi mdi-account-card-details"></i>
                  </span>
                  </div>
                    User
             </router-link>
        </li>
          <li class="nav-item menu-items">
             <router-link class="nav-link collapsed text-light" to="/outlet" v-if="role === 'admin'">
                <div class="sb-nav-link-icon">
                  <span class="menu-icon">
                  <i class="fas fa-columns mdi mdi-domain"></i>
                  </span>
                  </div>
                    Outlet
             </router-link>
          </li>
          <li class="nav-item menu-items">
            <router-link class="nav-link collapsed text-light" to="/paket" v-if="role === 'admin'">
                <div class="sb-nav-link-icon">
                  <span class="menu-icon">
                  <i class="fas fa-columns mdi mdi-basket"></i>
                  </span>
                </div>
                    Paket
            </router-link>
          </li>
          <li class="nav-item menu-items">
           <router-link class="nav-link collapsed text-light" to="/transaksi">
                <div class="sb-nav-link-icon">
                  <span class="menu-icon">
                  <i class="fas fa-columns mdi mdi-shopping"></i>
                  </span>
                </div>
                    Transaksi
            </router-link>
          </li>
        </ul>
      </nav>
          <div class="container-fluid page-body-wrapper">
    <nav class="navbar p-0 fixed-top d-flex flex-row">
          <div class="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
            <ul class="navbar-nav w-100">
            </ul>
            <ul class="navbar-nav navbar-nav-right">
              <button type="button" class="btn btn-outline-danger" @click="Logout" href="#!">Logout</button>
            </ul>
            <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
              <span class="mdi mdi-format-line-spacing"></span>
            </button>
          </div>
        </nav>
                    <router-view></router-view> 
    </div>
    </div>
</div>
</body>
</template>
<script>
module.exports = {
    data: function(){
        return {
            username: "",
            role: "",
        }
    },
    methods: {
        getInfo: function(){
            let config = {
                headers : {
                    "Authorization" : "Bearer " + this.$cookies.get('Authorization')
                }
            }

            axios.get(base_url + '/login/check', config)
            .then(response => {
                if(response.data.success == true){
                    this.username = response.data.data.username;
                    this.role = response.data.data.role;

            axios.get(base_url + "/outlet/" + response.data.data.id_outlet)
            .then(response => {
                if(response.data.success == true){
                this.nama_outlet = response.data.data.nama_outlet;
            }
          })
          .catch(error => {
            console.log(error);
          });
    
          } else {
            this.componentName = 'login';
            window.location = front_url;
          }
            })
            .catch(error => {
            console.log(error);
          });
          },
        
        Logout: function(){
            this.$cookies.remove("Authorization");
            this.componentName = "login";
            window.location = front_url;
        }
    },
    mounted(){
        this.getInfo();
    }
}
</script>

