import React, { useEffect, useState } from 'react';
import Header from './header';
import Footer from './Footer';
import axios from 'axios';
import './css/style.css';
import './css/font.css';

function Logbook() {
  const [pageContent, setPageContent] = useState('');

  useEffect(() => {
    axios
      .get('https://dev-mewebdevtest.pantheonsite.io/wp-json/wp/v2/pages/')
      .then(response => {
        // filter the response to find the slug
        const logbook = response.data.find(page => page.slug === 'logbook');

        if (logbook) {
          setPageContent(logbook.content.rendered);
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
            {pageContent ? (
              <div dangerouslySetInnerHTML={{ __html: pageContent }} />
            ) : (
              <p>Loading...</p>
            )}
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Logbook;