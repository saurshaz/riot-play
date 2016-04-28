import riot from 'riot'
import EVT from '../../state-manager/event_constants' 

<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="http://materializecss.com/bin/materialize.js"></script>
<fstag>
    <link href="http://materializecss.com/css/prism.css" rel="stylesheet">
    <link href="http://materializecss.com/css/ghpages-materialize.css" type="text/css" rel="stylesheet" media="screen,projection">
    <link href="http://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
      .pagebody {
          margin:20%;
          height: 500px;
          top: 200px;
          padding-top: 20px;
        };
    </style>

  <section>
    <div if={is_ready}>
      <div class="card small" style="overflow: hidden;">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="http://materializecss.com/images/office.jpg">
        </div>
        <div class="card-content small">
          <span class="card-title activator grey-text text-darken-4">Select App<i class="material-icons right">more_vert</i></span>

          <p><a href="#!">Select App</a></p>
        </div>
        <div class="card-reveal small" style="display: none; transform: translateY(0px);">
          <span class="card-title grey-text text-darken-4">Select App<i class="material-icons right">close</i></span>
          <p>Please select one of your existing Apps to work on</p>
          <!-- Dropdown Trigger -->

          <!-- Modal Trigger -->
          <a href="#"  class="waves-effect waves-light btn modal-trigger" >Modal</a>

          <!-- Modal Structure -->
          <div id="modal1" class="modal bottom-sheet">
            <div class="modal-content">
              <h4>Modal Header</h4>
              <p>A bunch of text</p>
            </div>
            <div class="modal-footer">
              <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
            </div>
          </div>
        </div>

        <div class="card-action">
          <a href="#!">Create new App</a>
          <a href="#!">Clone App</a>
        </div>
      </div>
    </div>

    <div if={ !is_ready }>
      <div class="progress" >
        <div class="pagebody indeterminate"></div>

      </div>
    </div>
    
  </section>
  <script>
    let self = this;
    setTimeout(function() {
      riot.control.trigger(EVT.INIT_CHAT_CONTAINER, {"a":"b"});
      self.is_ready = true;
      console.log('is_ready is ',self.is_ready)
      // $('#project_select').dropdown({
      //   inDuration: 300,
      //   outDuration: 225,
      //   constrain_width: false, // Does not change width of dropdown to that of the activator
      //   hover: true, // Activate on hover
      //   gutter: 0, // Spacing from edge
      //   belowOrigin: false, // Displays dropdown below the button
      //   alignment: 'left' // Displays dropdown with edge aligned to the left of button
      // });
       Materialize.toast('You\'re in, select an app !', 4000) // 4000 is the duration of the toast
      self.update()
    }, 2500);
    
  </script>
</fstag>
