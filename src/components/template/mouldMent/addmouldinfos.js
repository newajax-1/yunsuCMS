export default {
    name: 'mouldInfoNewDetail',
    created() {
        this.mould_id = this.$route.query.mould_id;
        this.init();
    },
    data() {
        return {
            table_data : [],
            mould_type_list : [],
            cavity_cnt_list : [],
            mould_status_list : [],
            mould_asc_list : [],
            cust_info_list : [],
            secd_proc_list : [],
            packing_typ_list : [],

            add_info : {
                mouldTyp : undefined,
                mouldCode : undefined,
                dsgnCnt : undefined,
                mouldSts : undefined,
                cavityCnt : undefined,
                moldingCycl : undefined,
                mouldAscription : undefined,
                mouldFactory : undefined,
                custFactory : undefined,
                machine : undefined,
            },

            table_data_son : {
                productNm : undefined,
                custProductNo : undefined,
                number : undefined,
                materialGrade : undefined,
                productWeight : undefined,
                color : undefined,
                gapWeight : undefined,
                secdProc : undefined,
                secdProcName : undefined,
                packingTyp : undefined,
                packingCount : undefined,
                packingDetl : undefined,
                packingTypName : undefined,
            },

            mould_id : undefined,
            save_id : undefined,
            diag_title : undefined,
            new_custom : false,
        }
    },
    methods: {
        init() {
            this.getTableData();
        },

        getTableData() {
            let that = this;

            this.$ajaxWrap({
                type :"post",
                url : "/mould/initData",
                data : {
                    mouldId : that.mould_id
                } ,
                success : function(res){
                    that.loadTable(res.data)
                }
            })
        },

        toAdd(id) {
            let that = this;
            this.diag_title = "增加产品"
            if(id) {
                this.diag_title = "修改产品"
                this.save_id = id;
                this.table_data.every(function(el){
                    if(el.index === id){
                        return  that.table_data_son = that.table_data[id - 1];
                    }
                })
            }
            this.new_custom = true;

            this.$ajaxWrap({
                type :"get",
                url : "product/selectById",
                data : {
                    type : "2",
                } ,
                success : function(res){
                    that.secd_proc_list = res.data.dicList5;
                    that.packing_typ_list = res.data.dicList6;
                }
            })
        },

        saveAddInfo() {
            if(!this.save_id) {
                let index = this.table_data.length;
                index++
                this.table_data_son.index = index;
                console.log(this.table_data_son)
                switch(this.table_data_son.secdProc) {
                    case "01" :
                        this.table_data_son.secdProcName = "精装"
                    case "02" :
                        this.table_data_son.secdProcName = "简装"
                    case "03" :
                        this.table_data_son.secdProcName = "无"
                };
                switch(this.table_data_son.packingTyp) {
                    case "01" :
                        this.table_data_son.packingTypName = "印刷"
                    case "02" :
                        this.table_data_son.packingTypName = "组装"
                    case "03" :
                        this.table_data_son.packingTypName = "镶嵌"
                    case "04" :
                        this.table_data_son.packingTypName = "包装"
                };
                
                let clone_data = JSON.parse(JSON.stringify(this.table_data_son))
                this.table_data.push(clone_data);

                this.$message({
                    message: "新增成功",
                    type: "success"
                });
            }else{
                for(var i = 0; i < this.table_data.length; i ++) {
                    if(this.table_data[i].index === this.save_id) {
                        this.table_data.splice(i,i + 1);
                        this.table_data_son.index = this.save_id;
                    }
                } 
                let clone_data = JSON.parse(JSON.stringify(this.table_data_son))
                this.table_data.push(clone_data);
            } 
            this.new_custom = false;
            this.$clearObject(this.add_info);
        },

        saveTableData() {
            let that = this;

            this.$ajaxWrap({
                type :"post",
                url : "/mould/saveMould",
                data : {
                    mouldTyp : that.add_info.mouldTyp,
                    mouldCode :that.add_info.mouldCode ,
                    dsgnCnt : that.add_info.dsgnCnt,
                    cavityCnt : that.add_info.cavityCnt,
                    moldingCycl : that.add_info.moldingCycl,
                    mouldSts : that.add_info.mouldSts,
                    mouldAscription : that.add_info.mouldAscription,
                    mouldFactory : that.add_info.mouldFactory,
                    custFactory : that.add_info.custFactory,
                    machine : that.add_info.machine,
                    productList : that.table_data
                } ,
                success : function(res){
                    that.$baseWarn(res.tipMsg,function() {
                        that.$clearObject(that.add_info);
                    });
                }
            })
        },

        deleteId(id) {
            let that = this;

            this.$confirm("你确定删除么？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                for(var i = 0; i < that.table_data.length; i ++) {
                    if(that.table_data[i].index === id) {
                        that.table_data.splice(i,i + 1);
                    }
                } 
                that.$message({
                    message: "删除成功",
                    type: "success"
                });
            }).catch(function() {});
        },

        loadTable(data) {
            let that = this;

            that.mould_type_list = data.mouldTypeList;
            that.cavity_cnt_list = data.cavityCntList;
            that.mould_status_list = data.mouldStatusList;
            that.mould_asc_list = data.mouldAscList;
            that.cust_info_list = data.custInfoList;
            if(data.bomList.length != 0) {
                that.table_data = data.bomList;
            }
            if(!!data.mould) {
                that.add_info = data.mould;
            }
        },

        // 点击关闭
        closeDialog() {
            var that = this;
            this.$confirm("你确定关闭么？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.new_custom = false;
            }).catch(function() {});
        },
    },
}
