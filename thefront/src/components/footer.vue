<template>
        <footer id="mainBlock">
        <div class ="logoBlock">
        <img src="../assets/icon-left-font-monochrome-white.svg" class="logoFooter" alt="logo de Groupomania"/><br/>
        </div>
        <div>
        <p>{{copyright}}</p>
        </div>
        </footer>

</template>
<script>
export default {
    name: "footerElement",
data(){
    return {
        image : 'src/assets/logo.png',
        siteName: "Groupomania"
    }
    
},
	computed: {
		copyright() {
			const currentYear = new Date().getFullYear()

			return `Copyright ${this.siteName} ${currentYear}`
		}
	},
}
</script>

<style scoped>
#mainBlock {
    color: #fff;
    background: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    column-gap: 90px;
    width:100%;
    max-height:100%;   /* Height of the footer */
    margin: 4px -4px -8px -4px;
}
.logoFooter{
height: 2rem;
margin: 10px 0 0 0;
}
</style>