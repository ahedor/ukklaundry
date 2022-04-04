<template>
    <div class="main-panel">
            <div class="content-wrapper">
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Data User</h4>
                <router-link to="/tambahtransaksi" class="btn btn-success btn-round mdi mdi-cart-plus text-dark" v-if="role !== 'owner'">
                  <span class="menu-title">Tambah Transaksi</span>
                </router-link>
              </div>
              <br>
              <form>
                <div class="row">
                  <div class="col-lg-6 col-md-6">
                      <div class="form-group">
                        <label for="tahun" class="col-form-label">Tahun</label>
                        <b-form-select class="form-control text-light" @change="getData($event)" v-model="tahun" :options="list_years"></b-form-select>
                      </div>
                  </div>
                   <div class="col-lg-6 col-md-6">
                      <div class="form-group">
                        <label for="tahun" class="col-form-label">Bulan</label>
                        <b-form-select class="form-control text-light" @change="getData($event)" v-model="bulan" :options="list_months"></b-form-select>
                      </div>
                  </div>
                </div>

              </form>
              <div class="table-responsive">

                <b-table  :items="transaksi" :fields="fields_transaksi" class="text-light">

                  <template v-slot:cell(status)="data">
                    <select class="form-control text-light" @change="changeStatus(data.item.id_transaksi, $event)" :disabled="role === 'owner'">
                      <option value="baru" :selected="data.item.status === 'baru'">Baru</option>
                      <option value="proses" :selected="data.item.status === 'proses'">Proses</option>
                      <option value="selesai" :selected="data.item.status === 'selesai'">Selesai</option>
                      <option value="diambil" :selected="data.item.status === 'diambil'">Diambil</option>
                    </select>
                  </template>

                  <template v-slot:cell(dibayar)="data">
                    <select class="form-control text-light" @change="changeBayar(data.item.id_transaksi, $event)" :disabled="role === 'owner'">
                      <option value="dibayar" :selected="data.item.dibayar === 'dibayar'">Dibayar</option>
                      <option value="belum_dibayar" :selected="data.item.dibayar === 'belum_dibayar'">Belum Dibayar</option>
                    </select>
                  </template>

                  <template v-slot:cell(Aksi)="data">
                    <b-button size="sm" class="btn btn-sm btn-warning btn-icon-text" v-on:click="Detail(data.item.detail_transaksi, data.item.total)" v-b-modal.modal-detail>
                          <i class="mdi mdi-file-document-box-outline btn-icon-prepend"></i>
                          Detail
                    </b-button>

                  </template>
                </b-table>

              </div>

            </div>
          </div>
        </div>
      </div>

    <b-modal
      id="modal-detail"
      ref="modal"
      title="Detail Transaksi"
      size="md"
      hide-footer="true"
    >

      <a href="#" class="btn btn-inverse-success" @click="Prints()">Print</a>
      <div class="table-responsive" id="print">
      <table class="table text-light">
        <tr>
          <th>#</th>
          <th>Jenis Paket</th>
          <th>Berat</th>
          <th>Sub Total</th>
        </tr>
        <tr v-for="(det, index) in detail_transaksi" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ det.jenis }}</td>
          <td>{{ det.berat }}</td>
          <td>{{ det.sub_total }}</td>
        </tr>
        <tr>
          <td colspan="3" class="h3 text-gray-900">Total</td>
          <td class="h3 text-success font-weight-bold text-success">
            Rp {{ total }}
          </td>
        </tr>
      </table>
      </div>



      <!-- <a href="#" class="btn btn-inverse-success" @click="Prints()">Print</a>
      <div class="table-responsive" id="print">

        <b-table class="table text-light" :items="detail_transaksi" :fields="fields_detail_transaksi">
        </b-table>
        <div class="text-right"><h4>Total: Rp{{ total }}</h4></div>

        
      </div> -->
    <!-- </b-modal>

    <b-modal
      id="modal-recipe"
      ref="modal"
      title="Nota Pemesanan"
      size="md"
      hide-footer="true"
    >
      <div class="table-responsive">
        <b-table  :items="detail_transaksi" :fields="fields_detail_transaksi">
        </b-table>
        <div class="text-right"><h4>Total: Rp{{ total }}</h4></div>
      </div>
    </b-modal> -->
  </div>
</template>

<script>
module.exports = {
  data : function(){
    return {
      tahun: "",
      bulan: "",
      tgl: "",
      action: "",
      message: "",
      key: "",
      total: "",
      role: "",
      transaksi: [],
      detail_transaksi: [],
      fields_transaksi: ["id_transaksi", "nama_member", "tgl", "status", "dibayar", "tgl_bayar", "kasir", "total", "Aksi"],
      fields_detail_transaksi: ["jenis", "berat", "sub_total"],
      list_years: [2020, 2021, 2022, 2023],
      list_months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let form = {
        "tahun": this.tahun,
        "bulan": this.bulan,
        "tgl": this.tgl
      }
      axios.post(base_url + "/transaksi/report", form, conf)
      .then(response => {
          this.transaksi = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
    },
    changeStatus: function(id_transaksi, event){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let form = {
        "id_transaksi": id_transaksi,
        "status": event.target.value
      }
      axios.put(base_url + "/transaksi/status", form, conf)
      .then(response => {
        alert(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
      this.getData();
    },
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
                }
            })
        },
        
    changeBayar: function(id_transaksi, event){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let form = {
        "id_transaksi": id_transaksi,
        "dibayar": event.target.value
      }
      axios.put(base_url + "/transaksi/bayar", form, conf)
      .then(response => {
        alert(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
      this.getData();
    },
    Detail: function(detail_transaksi, total){
      this.total = total;
      this.detail_transaksi = detail_transaksi;
      
    },

    Prints: function(){
      const prtHtml = document.getElementById('print').innerHTML;
      //console.log(prtHtml);
      let stylesHtml = '';
      for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
        stylesHtml += node.outerHTML;
      }

      const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

      WinPrint.document.write(`<!DOCTYPE html>
      <html>
        <head>
        <link rel="stylesheet" href="src/assets/css/bootstrap.min.css">
          
        </head>
        <body>
          ${prtHtml}
        </body>
      </html>`);

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    }

  },
  mounted(){
    this.key = this.$cookies.get("Authorization");
    this.getData();
    this.getInfo();
  }
}

</script>