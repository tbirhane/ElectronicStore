package controller;

//import model.MapUsers;
import data.access.MapUsers;
import model.User;


import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.List;

@WebServlet("/login")

public class Login extends HttpServlet {
    private MapUsers usersDAO;
    @Override
    public void init() throws ServletException {
        super.init();
        usersDAO = MapUsers.getInstance();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String userName = req.getParameter("user-name");
        String password = req.getParameter("password");
        String rememberme = req.getParameter("checkbox");
        System.out.println("checkbox: "+rememberme);
        HttpSession session = req.getSession();

  //      User[] users = MapUsers.getUsers();
        boolean flag = false;
//        for(int i =0; i < users.length; i++){
//            if(userName.equals(users[i].getUserName()) &&
//                    password.equals(users[i].getPassword())){
//                flag = true;
//                break;
//            }
//        }
        List<User> users = usersDAO.getAllUsers();
        for (User u: users){
            if(u.getUserName().equals(userName) &&
                u.getPassword().equals(password)){
                flag = true;
                break;
            }
        }


        if(flag) {

            session.setAttribute("userName", userName);
            if (rememberme != null && rememberme.equals("on")) {
                Cookie userNameCookie = new Cookie("user-name", userName);
                Cookie rememberMecookie = new Cookie("checkbox", rememberme);
                userNameCookie.setMaxAge(30 * 24 * 60 * 60); //equivalent one month in seconds
                rememberMecookie.setMaxAge(30 * 24 * 60 * 60);
                System.out.println("cookie: " + userNameCookie.getValue());
                resp.addCookie(userNameCookie);
                resp.addCookie(rememberMecookie);
            } else {
                Cookie cUserName = new Cookie("user-name", null);
                Cookie rememberMecookie = new Cookie("checkbox", rememberme);
                cUserName.setMaxAge(0);
                rememberMecookie.setMaxAge(0);
                resp.addCookie(cUserName);
                resp.addCookie(rememberMecookie);
            }
            resp.sendRedirect("welcome.jsp");
        }
        else {
            session.setAttribute("msg", " Invalid user name and password!");
            RequestDispatcher requestDispatcher = req.getRequestDispatcher("login.jsp");
            requestDispatcher.forward(req, resp);
        }

    }
}
