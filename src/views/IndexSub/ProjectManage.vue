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
          项目名称:
          <div style="display: inline-block" v-if="!edit">
            {{ currProject.name }}
          </div>
          <div v-else>
            <input style="width: 7em" type="text" v-model="currProject.name">
          </div>
        </div>
        <div>
          项目进度:
          <div style="display: inline-block" v-if="!edit">
            {{ currProject.complete_per }} %
          </div>
          <b-progress
              :value="currProject.complete_per"
              :max="100"
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
      <b-button size="sm" style="margin-top: 20px" variant="success" @click="edit = !edit">
        <b-icon icon="pencil-square"></b-icon>
      </b-button>
    </b-card>
    <!-- 项目进度面板 -->
    <b-card
        title="项目进度"
        class="project-half-card base-card"
    >
      <template slot="header"> 项目进度
        <b-button @click="getProjectProcess()" size="sm" variant="outline-primary">
          <b-icon icon="cloud-download"></b-icon>
        </b-button>
      </template>
      <light-timeline :items="timelineItem">
        <template slot='content' slot-scope='{ item }'>
          <div class="timeline-content">
            {{ item.full.comment }}
          </div>
          <div class="timeline-pic">
            <pic :picid="item.full.pic" img-style="width: 200px; display: block"></pic>
          </div>
        </template>
      </light-timeline>
    </b-card>
    <!-- 项目管理面板 -->
    <b-card
        header="项目管理"
        title="项目管理"
        class="project-half-card base-card"
    >
      <b-button size="sm" variant="primary" style="margin-right: 10px">通知项目经理</b-button>
      <b-button size="sm" variant="primary" style="margin-right: 10px" v-b-modal.manage-project-manager>管理项目管理者
      </b-button>
      <b-button size="sm" variant="success" style="margin-right: 10px">工单下发</b-button>
      <b-button size="sm" variant="success" style="margin-right: 10px" v-b-modal.add-progress-modal>推进项目</b-button>
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
                  @click="currProject=row.item; getProjectSupervisors(); getProjectProcess()"
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
    <!-- 推进项目弹出层 -->
    <b-modal id="add-progress-modal" title="推进项目（百分比）" @ok="doAddProgress">
      <b-form-group
          id="fieldset-1"
          description="可写负值，表示回滚项目进度"
          label="推进进度"
          label-for="input-1"
      >
        <b-form-input
            id="input-1"
            v-model="addProgress"
            type="number"
            :state="state"
            trim
        ></b-form-input>
      </b-form-group>
    </b-modal>
    <!-- 管理项目管理者弹出层 -->
    <b-modal title="管理项目监理" id="manage-project-manager">
      <b-input-group>
        <b-form-input placeholder="监理用户名" v-model="addSupervisorUsername"></b-form-input>

        <b-input-group-append>
          <b-button variant="outline-primary">
            <b-icon icon="search" @click="addSupervisor"></b-icon>
          </b-button>
        </b-input-group-append>
      </b-input-group>
      当前项目管理人
      <div v-for="supervisor in currentProjectSupervisors" :key="supervisor.id">
        <b-card>
          姓名：{{ supervisor.name }}
          <b-badge variant="success">{{ supervisor.username }}</b-badge>
          <b-button size="sm" variant="danger" style="float: right" @click="deleteSupervisor(supervisor.id)">删除
          </b-button>
        </b-card>
      </div>
    </b-modal>
  </div>

</template>

<script>
import {api, uploadPic} from "@/utils";
import Pic from "@/components/Pic";


export default {
  name: "ProjectManage",
  components: {
    'pic': Pic
  },
  mounted() {
    this.getMyProjectInfo(this.allProjectSelect.currPage);
  },
  data() {
    return {
      addSupervisorUsername: '',
      currentProjectSupervisors: [],
      currentProjectProcess: [],
      currProject: null,
      edit: false,
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
      },
      addProgress: 0,
    }
  },
  methods: {
    getProjectProcess() {
      api.bind(this)(
          '/project/get_project_process',
          {
            'pid': this.currProject.id,
          },
          (response) => {
            this.currentProjectProcess = response.data.processes;
          },
          true,
      )
    },
    getProjectSupervisors() {
      api.bind(this)(
          '/project/get_project_supervisors',
          {
            id: this.currProject.id,
          },
          (response) => {
            let data = response.data;
            if (!data.success)
              alert(data.info);
            this.currentProjectSupervisors = data.supervisors;
          },
          true,
      )
    },
    doAddProgress() {
      if (this.currProject) {
        this.currProject.complete_per = this.currProject.complete_per * 1 + this.addProgress * 1;
        this.alterProject()
      }
    },
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
    deleteSupervisor(id) {
      console.log(id, this.currProject.id);
      api.bind(this)(
          '/project/remove_project_supervisor',
          {
            id,
            pid: this.currProject.id
          },
          (response) => {
            let data = response.data;
            if (data.success) {
              this.getProjectSupervisors();
            } else {
              alert(data.info);
            }
          },
          true,
      )
      ;
    },
    addSupervisor() {
      api.bind(this)(
          '/project/add_project_supervisor',
          {
            id: this.currProject.id,
            username: this.addSupervisorUsername,
          },
          (response) => {
            let data = response.data;
            if (data.success) {
              this.getProjectSupervisors();
            } else {
              alert(data.info);
            }
          },
          true,
      )
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
    },
    alterProject() {
      api.bind(this)(
          '/project/alter_project',
          this.currProject,
          (response) => {
            let data = response.data;
            if (!data.success) {
              alert(data.info);
            }
          },
          true,
      )
    },
  },
  computed: {
    timelineItem() {
      return this.currentProjectProcess.map(e => {
        return {
          tag: e.date,
          full: e,
        };
      });
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
  height: 40vh;
  overflow-y: auto;
  overflow-x: hidden;
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

.timeline-pic {
  height: 200px;
  margin-bottom: 30px;

}

.timeline-content {
}
</style>