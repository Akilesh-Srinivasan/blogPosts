import React from 'react';
import PostList from './postList';

class App extends React.Component {
    render() {
        return (
            <div className='ui container'>
                <PostList/>
            </div>
        );
    };
};

export default App;