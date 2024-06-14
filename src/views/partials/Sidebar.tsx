const Sidebar = ()=> {
    return (
        <aside>
            <ul>
                {user.role === "admin" ? <li>themes</li> : null}
                <li>gallery</li>
                {user.role === "admin" ? <li>rbac</li> : null}
                <li>articles</li>
                <li>comments</li>
                <li>add-on</li>
                <li>theme configuration</li>
            </ul>
        </aside>
    )
}