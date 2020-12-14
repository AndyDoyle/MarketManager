<template>
    <div class="footer">
        <p>SICNU Soft engineering Group 1, Class 2018 版权所有</p>
        <p>
            <span>Department of Software Engineering LTD</span>
            <span>Group 1 Class 2018</span>
            <span>
                <span class="el-icon-lx-weibo"></span>"微博：MrRight96494"
            </span>
            <span>业务经营许可证编号：B1-0000000</span>
        </p>
    </div>
</template>
<script>
import bus from '../common/bus';
export default {
    
}
</script>
<style scoped>
.footer {
    height: 70px;
    text-align: center;
    padding-top: 27px;
    border-top: 1px solid #42444B;
}
.footer p {
    line-height: 26px;
    font-size: 14px;
    color: #6C6E73;
}
.footer p span {
    margin-left: 17px;
}
.footer p span.police-icon {
    display: inline-block;
    width: 25px;
    height: 20px;
    vertical-align: top;
}
</style>