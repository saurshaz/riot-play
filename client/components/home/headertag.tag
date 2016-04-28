import riot from 'riot';

<headertag>
    <header class="navbar-fixed">
        <!-- Dropdown Structure -->
        <ul id="dropdown1" class="dropdown-content">
            <li><a href="/home#helloapp">Team</a></li>
            <li><a href="/home#helloapp">How it works?</a></li>
            <li class="divider"></li>
            <li><a href="/home#helloapp">Contact Us</a></li>
        </ul>
        <nav>
            <div class="nav-wrapper">
                <div class="navbar-fixed">
                    <div class="nav-wrapper" >
                    <a href="/home#home">
                      <img src="http://riotjs.com/img/logo/riot120x.png"/>
                      <ul class="right hide-on-med-and-down">
                      </ul>
                  </a>
                  <ul class="right hide-on-med-and-down">
                      <li><a href="/home#testapp?p=pane1&cid=home&a=b&c=d">ATester</a></li>
                      <li><a href="/home#testapp">Login</a></li>
                      <!-- Dropdown Trigger -->
                      <li><a class="dropdown-button" href="#!" data-activates="dropdown1">About Us<i class="material-icons right">arrow_drop_down</i></a></li>
                  </ul>
                </div>
        </nav>
    </header>
    <script>
            let self = this;
            // setTimeout(function() {
            //   riot.control.trigger(EVT.INIT_CHAT_CONTAINER, {"a":"b"});
            // }, 2500);
            self.on('mount', function() {
              // riot.mount('*')
              self.update()
            })
          </script>
</headertag>