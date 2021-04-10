<template>
  <div>
    当前项目: {{ currProject ? currProject.name : '请选择项目' }}
    <b-button v-b-modal.modal-change-proj size="sm" variant="success">
      <b-icon icon="pencil-fill"></b-icon>
      切换
    </b-button>
    <b-modal id="modal-change-proj" size="xl">
      <template v-slot:modal-header>
        <div>
          <h4 style="margin: 0">
            切换项目
            <b-button variant="success" size="sm" style="margin-bottom: 5px"
                      @click="changeDisplayMap = !changeDisplayMap">
              <b-icon icon="signpost-split"></b-icon>
            </b-button>
          </h4>
        </div>
      </template>
      <div v-if="changeDisplayMap" class="change-display-zone">
        地图显示
      </div>
      <div v-else class="change-display-zone">
        <!--表格-->
        <div class="select-table">
          <b-table :items="allProjectSelect.data" :fields="allProjectSelect.fields">
            <template #cell(operate)="row">
              <b-button
                  variant="success"
                  size="sm"
                  style="margin-right: 4px"
                  @click="currProject=row.item"
                  :disabled="currProject && row.item.id === currProject.id"
              >
                <b-icon icon="check2"></b-icon>
              </b-button>
              <b-button variant="danger" size="sm">
                <b-icon icon="dash"></b-icon>
              </b-button>
            </template>
          </b-table>
        </div>
      </div>
      <b-button size="sm" variant="success" v-b-modal.modal-add-project>
        <b-icon icon="plus"></b-icon>
      </b-button>
    </b-modal>
    <b-modal id="modal-add-project" title="新建项目" @ok="addProject">
      <div class="new-project-modal">
        <b-input-group prepend="项目名称" class="mb-2">
          <b-form-input v-model="addProjectData.name"></b-form-input>
        </b-input-group>
        <b-input-group prepend="项目规模" class="mb-2">
          <b-form-input v-model="addProjectData.scale" type="number"></b-form-input>
        </b-input-group>
        <b-input-group prepend="项目成本" class="mb-2">
          <b-form-input v-model="addProjectData.cost" type="number"></b-form-input>
        </b-input-group>
        <b-input-group prepend="项目坐标" class="mb-2">
          <b-form-input v-model="addProjectData.lng" placeholder="经度"></b-form-input>
          <b-form-input v-model="addProjectData.lat" placeholder="纬度"></b-form-input>
        </b-input-group>
        <b-form-textarea
            placeholder="项目描述"
            rows="3"
            max-rows="6"
            v-model="addProjectData.describe"
        ></b-form-textarea>
        <b-form-file accept="image/jpeg, image/png" browse-text="项目预览图"
                     @change="uploadFile($event.target.files[0])"></b-form-file>
      </div>
    </b-modal>
  </div>

</template>

<script>
import {api} from "@/utils";
import {uploadPic} from "@/utils";


export default {
  name: "ProjectManage",
  mounted() {
    this.getMyProjectInfo(this.allProjectSelect.currPage);
  },
  data() {
    return {
      currProject: null,
      changeDisplayMap: false,
      allProjectSelect: {
        currPage: 1,
        fields: ['id', 'name', 'describe', 'scale', 'cost', 'complete_per', 'operate'],
        data: []
      },
      addProjectData: {
        name: '',
        describe: '',
        cost: 0,
        scale: 0,
        pic: null,
        lng: 0,
        lat: 0,
      }
    }
  },
  methods: {
    getProjectInfo(pids) {
      api.bind(this)(
          '/project/get_project',
          {
            pids
          },
          (response) => {
            console.log(response);
          }
      );
    },
    getMyProjectInfo(page) {
      api.bind(this)(
          '/project/get_project_from_uid',
          {
            page,
          },
          (response) => {
            const data = response.data;
            this.allProjectSelect.data = data.data;
            console.log(data);
          },
          true
      );
    },
    uploadFile(file) {
      uploadPic.bind(this)(file, (response) => {
        this.addProjectData.pic = response.data.id;
      });
    },
    addProject() {
      api.bind(this)(
          '/project/add_project',
          this.addProjectData,
          (response) => {
            let data = response.data;
            this.getMyProjectInfo(this.allProjectSelect.currPage);
            alert(data.info);
          },
          true
      )
    }
  }
}
</script>

<style scoped>
.change-display-zone {
  height: 70vh;
}

.select-table {
  height: calc(100% - 31px);
}

.new-project-modal > * {
  margin-bottom: 10px;
}

</style>