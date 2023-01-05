<template>
    <div id="borderBack">
        <div id="borderFront">
            <!-- <div id="frontPourcent" style="width:32%"> -->
            <div id="frontPourcent" wi>
            </div>
            <!-- <input type="text" id="tb" > -->
        </div>
    </div>
</template>

<script>
export default {
    name: "Textbox",
    props: ['pourcent']
}

</script>

<style scoped>
#borderBack
    {
        width: 100%;
        height: 50px;
        width: 100%;
        background-color:rgb(249, 178, 51);
        align-items: stretch;
        vertical-align: middle;
        position: relative;
        border-radius: 15px;
        padding: 5px;
    }
    #borderFront
    {
        display: flex;
        height: 100%;
        background-color: rgb(65, 0, 0);
        position: relative;
        border-radius: 15px;
    }
    #frontPourcent
    {
        display: flex;
        height: 100%;
        /* width: 25%; */
        background-color: rgb(255, 0, 0);
        position: relative;
        border-radius: 15px;

    }


    #tb
    {
        position: absolute;
        top: 50%;
        width:  100%;
        padding: -25px;
        background-color: aliceblue;
        border-radius: 0px;
        transform: translateY(-50%);
        border: none;
        text-align: center;
    }
</style>