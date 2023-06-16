import React, { useEffect, useState } from 'react';
import Header from './header';
import Footer from './Footer';
import axios from 'axios';
import './css/style.css';
import './css/font.css';

function GamePage() {
  const [pageContent, setPageContent] = useState('');

  useEffect(() => {
    axios
      .get('https://dev-mewebdevtest.pantheonsite.io/wp-json/wp/v2/pages/')
      .then(response => {
        // filter the response to find the slug
        const gamePage = response.data.find(page => page.slug === 'game');

        if (gamePage) {
          setPageContent(gamePage.content.rendered);
          console.log(gamePage.content.rendered);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Header />
      <main>
        <section id="articles">
          <article>
            <div id="canvas">
            {pageContent ? (
                <div dangerouslySetInnerHTML={{ __html: pageContent }} />
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default GamePage;