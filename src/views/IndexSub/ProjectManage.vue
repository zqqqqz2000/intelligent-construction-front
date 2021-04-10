<template>
  <div class="manage-page">
    <div class="project-header">
      当前项目:
      <div class="project-name">
        {{ currProject ? currProject.name : '请选择项目' }}
      </div>
      <b-button v-b-modal.modal-change-proj size="sm" variant="success">
        <b-icon icon="pencil-fill"></b-icon>
        切换
      </b-button>
    </div>
    <!-- 项目信息面板 -->
    <b-card
        header="项目信息"
        title="当前项目信息"
        class="project-info-card base-card"
    >
      <div v-if="currProject" class="project-info-content">
        <div>
          项目名称: {{ currProject.name }}
        </div>
        <div>
          项目进度: {{ currProject.complete_per }} %
          <b-progress
              :value="currProject.complete_per"
              :max="100"
              show-value
              style="width: 70%"
          >
          </b-progress>
        </div>
        <div>
          项目投资: {{ currProject.cost }}
        </div>
        <div>
          项目位置: 精度 {{ currProject.lng }} 纬度 {{ currProject.lat }}
        </div>
        <div>
          项目规模: {{ currProject.scale }}
        </div>
        <div>
          详细描述: {{ currProject.describe }}
        </div>
      </div>
      <b-button size="sm" style="margin-top: 20px" variant="success">
        <b-icon icon="pencil-square"></b-icon>
      </b-button>
    </b-card>
    <!-- 项目进度面板 -->
    <b-card
        header="项目进度"
        title="项目进度"
        class="project-half-card base-card"
    >
      项目进度...尚未完成
    </b-card>
    <!-- 项目管理面板 -->
    <b-card
        header="项目管理"
        title="项目管理"
        class="project-half-card base-card"
    >
      <b-button size="sm" variant="primary" style="margin-right: 10px">通知项目经理</b-button>
      <b-button size="sm" variant="success" style="margin-right: 10px">工单下发</b-button>
      <b-button size="sm" variant="success" style="margin-right: 10px">推进项目</b-button>
      <b-button size="sm" variant="danger" style="margin-right: 10px">关闭项目</b-button>
    </b-card>
    <!-- 切换项目弹出层 -->
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
.manage-page {
  padding: 10px;
  width: 100%;
}

.change-display-zone {
  height: 70vh;
}

.select-table {
  height: calc(100% - 31px);
}

.new-project-modal > * {
  margin-bottom: 10px;
}

.project-header {
  margin-bottom: 10px;
}

.project-name {
  display: inline-block;
  font-size: 20px;
  font-weight: 1000;
  margin-right: 10px;
  color: gray;
}

.base-card {
  margin: 10px;
  float: left;
}

.project-info-card {
  width: calc(100% - 20px);
}

.project-half-card {
  width: calc(50% - 20px);
}

.project-info-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.project-info-content > div {
  margin-bottom: 10px;
}

</style>