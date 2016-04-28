import riot from 'riot'

<footertag>
	<footer class="page-footer">
            <div class="container">
                <div class="row">
                    <div class="col l4 s12">
                        <h5 class="white-text">Dummy Heading</h5>
                        <p class="grey-text text-lighten-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, ex minima aliquam, eveniet, ea rerum cupiditate fugit et sequi, officia amet! Neque nihil modi recusandae adipisci est minus, sit reiciendis!</p>
                    </div>
                    <div class="col l4 s12">
                        <h5 class="white-text">Join the Discussion</h5>
                        <p class="grey-text text-lighten-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto cumque sapiente voluptatibus adipisci id. Delectus ipsam illum asperiores aspernatur non doloremque quo est ullam, illo architecto, excepturi ut fugit minima.</p>
                        <a class="btn waves-effect waves-light red lighten-3" target="_blank" href="https://gitter.im/Dogfalo/materialize">Chat</a>
                    </div>
                    <div class="col l4 s12" style="overflow: hidden;">
                        <h5 class="white-text">Connect</h5>
                        <iframe src="http://ghbtns.com/github-btn.html?user=dogfalo&repo=materialize&type=watch&count=true&size=large" allowtransparency="true" frameborder="0" scrolling="0" width="170" height="30"></iframe>
                        <br>
                        <a href="https://twitter.com/MaterializeCSS" class="twitter-follow-button" data-show-count="true" data-size="large" data-dnt="true">Follow @MaterializeCSS</a>
                        <br>
                        <div class="g-follow" data-annotation="bubble" data-height="24" data-href="https://plus.google.com/108619793845925798422" data-rel="publisher"></div>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <div class="container">
                    © 2014-2016 Riot-Man, No rights reserved. (Power by Materialize)
                    <a class="grey-text text-lighten-4 right" href="https://github.com/saurshaz/riot-fullstack-starter-kit">Github Repo</a>
                </div>
            </div>
        </footer>
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
</footertag>