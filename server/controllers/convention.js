const conventionDao = require('../service/convention_dao')


module.exports = {

    //添加非遗数据
    postConvention: async(ctx) => {
        const data = ctx.request.body;

        let msg = {
            c_name: data.c_name,
            c_company: data.c_company,
            c_synopsis: data.c_synopsis,
            publish_id: data.publish_id,
            type_id: data.type_id,
            province_id: data.province_id
        };
        const postConventionInfo = await conventionDao.postConvention(msg)
        // console.log(postConventionInfo)
        
        if(postConventionInfo[1] === true){
            ctx.status = 200;
            ctx.body = {
                code: 1,
                message: '添加成功'
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                message: '该数据已经存在,请勿重复添加!'
            }
        }
    },

    //删除非遗数据
    deleteConvention: async(ctx) => {
        const msg = ctx.params.id;
        //console.log(msg);
        const deleteConventionInfo = await conventionDao.deleteConvention(msg);
        //console.log(deleteConventionInfo);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '删除成功'
        }
    },

    //编辑非遗数据
    putConvention: async(ctx) => {
        const msg = ctx.params.id;
        const data = ctx.request.body;

        let putConventionInfo = {
            c_name: data.c_name,
            c_company: data.c_company,
            c_synopsis: data.c_synopsis,
            publish_id: data.publish_id,
            type_id: data.type_id,
            province_id: data.province_id 
        }
        await conventionDao.putConvention(putConventionInfo, msg);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '修改成功',
        }
    },

    //查看某一条非遗信息
    getConventionInfo: async(ctx) => {
        const msg = ctx.params.id;
        // console.log(msg);
        const conventionInfo = await conventionDao.getConventionInfo(msg);
        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '数据获取成功',
            data: conventionInfo
        }
    },

    //查看所有非遗数据
    postAllConvention: async(ctx) => {
        const data = ctx.request.body;
        const allConventionInfo = await conventionDao.postAllConvention(data);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '获取所有非遗数据',
            data: {
                conventionList: allConventionInfo.rows,
                total: allConventionInfo.count
            }
        }
    },

    //下载所有非遗数据
    getAllConvention: async(ctx) => {
        const allConvention = await conventionDao.getAllConvention();

        ctx.status = 200;
        ctx.body = {
            code: 1,
            message: '下载所有非遗数据',
            data: allConvention
        }
    }
    
}