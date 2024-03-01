import React from 'react';
import TreeComponent from '../components/TreeComponent';
import { Container } from 'react-bootstrap';
import styles from './index.module.css';
import ClickableCV from '../components/ClickableCV';
const Home = () => (
    <>  <div className={styles.banner}>
            <Container>
                <br />
                <br />
                <br />
                <div className={styles.row}>
                    <div className={styles.citation}>
                        <span className={styles.line1}>He who plants a Tree</span>
                        <span className={styles.line2}>plants a Hope.</span>
                        <span className={styles.author}>Plant a Tree - Lucy Larcom</span>
                    </div>
                    <div className={styles.tree}>
                        <TreeComponent />
                    </div>
                </div>
            </Container>
        </div>
        <Container>
            <ClickableCV />

            <p>
                Second part : last 3 projects 
            </p>
            <p>
                Third part : last 3 competitions
            </p>
            
        </Container>
    </>
);

export default Home;