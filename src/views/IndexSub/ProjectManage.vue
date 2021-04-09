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
          <b-table :items="allProjectSelect.data" :fields="allProjectSelect.fields"></b-table>
        </div>
      </div>
      <b-button size="sm" variant="success" v-b-modal.modal-add-project>
        <b-icon icon="plus"></b-icon>
      </b-button>
    </b-modal>
    <b-modal id="modal-add-project" title="新建项目">
      添加项目
    </b-modal>
  </div>

</template>

<script>
import {api} from "@/utils";


export default {
  name: "ProjectManage",
  mounted() {
    this.getMyProjectInfo(1);
  },
  data() {
    return {
      currProject: null,
      changeDisplayMap: false,
      allProjectSelect: {
        currPage: 1,
        fields: ['id', 'name', 'describe', 'scale', 'cost', 'complete_per'],
        data: []
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
            this.allProjectSelect.data = data;
          },
          true
      );
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

</style>