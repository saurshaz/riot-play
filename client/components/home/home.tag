import riot from 'riot'
import moment from 'momentjs'
import EVT from '../../state-manager/event_constants' 


<home>
    <link href="http://materializecss.com/css/prism.css" rel="stylesheet">
    <link href="http://materializecss.com/css/ghpages-materialize.css" type="text/css" rel="stylesheet" media="screen,projection">
    <link href="http://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <!--  Parallax Section  -->
  <div class="parallax-container">
      <div class="parallax"><img src="http://materializecss.com/images/parallax1.jpg"></div>
  </div>
  <div class="section white">
      <div class="row container">
          <h2 class="header">Riot-Man</h2>
          <p class="grey-text text-darken-3 lighten-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam veniam ad optio quasi quia commodi neque animi laboriosam nesciunt possimus porro, rerum molestiae nihil minus odit. Dignissimos deleniti, non asperiores.</p>
      </div>
      <div class="row container">
          <h4 class="light">Parallax Demo HTML</h4>
          <pre>
      <code class="language-markup col s12">

      </code>
    </pre>
      </div>
  </div>
  <div class="parallax-container">
      <div class="parallax"><img src="http://materializecss.com/images/parallax2.jpg"></div>
  </div>
  <script>
    let self = this;
    setTimeout(function() {
      riot.control.trigger(EVT.INIT_CHAT_CONTAINER, {"a":"b"});
    }, 2500);
    self.on('mount', function() {
      // riot.mount('*')
      self.update()
    })
  </script>
</home>
