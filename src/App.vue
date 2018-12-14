<template>
  <div id="app">
    <div class="content_box">
	<div class="left_bar">
	    <ul class=" nav-tabs--vertical nav" role="navigation">
		<li class="nav-item">
			<a href="#" @click="goHome()" class="nav-link active" data-toggle="tab" role="tab" aria-controls="lorem">Users</a>
		</li>
		<li class="nav-item">
			<a href="#ipsum" class="nav-link" data-toggle="tab" role="tab" aria-controls="ipsum">Products</a>
		</li>
		<li class="nav-item">
			<a href="#dolor" class="nav-link " data-toggle="tab" role="tab" aria-controls="dolor">Orders</a>
		</li>
	</ul>
	</div>
    <div class="right_bar ">
        	<div class="tab-content ">
		<div class="tab-pane fade show active" id="lorem" role="tabpanel">

<div class="container">
  <router-view/>
</div>

			</div>
	</div> 
     </div>
</div> 

    
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    /**
     * Changes route to customer List view
     * @function goHome
     */
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>


<style lang="scss">
.content_box{
    float:left;
    width:100%;
}
.left_bar{
    float:left;
    width:15%;
    background:#eaf4ff;
    height:100vh;
}

.right_bar{
    float:left;
    width:85%;
    padding:15px;
        /*border-left:1px solid #ccc;*/
        height:100%;
}

.nav-tabs--vertical li{
    float:left;
    width:100%;
    padding:0;
    position:relative;
}


.nav-tabs--vertical li a{
    float:left;
    width:100%;
    padding: 15px;
    border-bottom:1px solid #adcff7;
    color:#1276F0;
}

.nav-tabs--vertical li a.active::after {
    content: "";
    border-color: #1276F0;
    border-style: solid;
    position: absolute;
    right: -8px;
    /* border-top: transparent; */
    border-right: transparent;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    /*border-bottom: 16px solid #1276F0;*/
      border-bottom: 16px solid #fff;
    border-top: 0;
    transform: rotate(270deg);
    z-index:999;
}
</style>
