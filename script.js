    document.getElementById("bookmarkForm").addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('bookmarksTitle').value;
        const url = document.getElementById('bookmarksUrl').value;

        addBookmark(title, url);
        saveBookmark(title, url);
        document.getElementById("bookmarkForm").reset();
    })

    function addBookmark(title, url) {
        const bookmarkList = document.getElementById('bookmarkList');

        const li = document.createElement('li');

        const link = document.createElement('a');
        link.href = url;
        link.textContent = title;
        link.target = '_blank';

        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = ' ❌';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function () {
            bookmarkList.removeChild(li);
            deleteBookmark(title);

        };

        li.appendChild(link);
        li.appendChild(deleteBtn);
        bookmarkList.appendChild(li);
    }

    function saveBookmark(title, url) {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarks.push({ title, url });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    function deleteBookmark(title) {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarks = bookmarks.filter(bookmark => bookmark.title !== title);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    function loadBookmarks() {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarks.forEach(bookmark => addBookmark(bookmark.title, bookmark.url));
    }

    window.onload = loadBookmarks;