import riot from 'riot'
import EVT from '../../state-manager/event_constants' 

<helloapp>
  <section>
    <rg-map></rg-map>
  </section>
  <script>
    let self = this;
    setTimeout(function() {
      riot.control.trigger(EVT.INIT_CHAT_CONTAINER, {"a":"b"});
    }, 2500);
    
  </script>
</helloapp>
