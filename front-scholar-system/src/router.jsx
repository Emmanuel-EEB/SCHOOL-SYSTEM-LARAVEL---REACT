import {createBrowserRouter} from 'react-router-dom'
//Vistas Admin
import AdminLayout from './components/layouts/AdminLayout';
import Index from './components/views/admin/Index';
import AuthAdmin from './components/auth/AuthAdmin';
import TeacherLayout from './components/layouts/TeacherLayout';
import AuthTeacher from './components/auth/AuthTeacher';
import StudentLayout from './components/layouts/StudentLayout';
import AuthStudent from './components/auth/AuthStudent';
import Estudiante from './components/views/admin/students/Estudiante';
import AuthAdminLayout from './components/layouts/AuthAdminLayout';
import Docente from './components/views/admin/docentes/Docente';
import Asignatura from './components/views/admin/asignatura/Asignatura';
import InicioAdmin from './components/views/admin/InicioAdmin';
import Layout from './components/layouts/Layout';
import Inicio from '././components/Inicio';
import AddStudent from './components/views/admin/students/AddStudent';
//Vistas Estudiante
import IndexUser from './components/views/student/IndexUser';
import AuthUserLayout from './components/layouts/AuthUserLayout';
import AuthTeacherLayout from './components/layouts/AuthTeacherLayout';
import IndexTeacher from './components/views/teacher/IndexTeacher';
import AddCurso from './components/views/admin/cursos/AddCurso';
import Curso from './components/views/admin/cursos/Curso';
import DetalleCurso from './components/views/admin/cursos/DetalleCurso';
import AddDocente from './components/views/admin/docentes/AddDocente';
import AddAsignatura from './components/views/admin/asignatura/AddAsignatura';
import AddStCur from './components/views/admin/cursos/AddStCur';
import CargaMasivaStudent from './components/views/admin/students/CargaMasivaStudent';
import AgregrarAsignaturaCurso from './components/views/admin/asignatura/AgregrarAsignaturaCurso';
import AgregarAsignaturaDocente from './components/views/admin/docentes/AgregarAsignaturaDocente';
//VISTAS DOCENTES


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children:[
      {
        index: true,
        element:<Inicio/>
      }
    ]
    },
    {
     path: '/admin',
     element: <AdminLayout/>,
     children:[
      {
        path: '/admin/index',
        element:<Index/>
      },
      {
        path: '/admin/inicio',
        element:<InicioAdmin/>
      },
      {
        path: '/admin/carga-msv-st',
        element:<CargaMasivaStudent/>
      },
      {
        path: '/admin/estudiante',
        element:<Estudiante/>
      },
      {
        path: '/admin/addestudiante',
        element:<AddStudent/>
      },
      {
        path: '/admin/curso',
        element:<Curso/>
      },
      {
        path: '/admin/addCurso',
        element:<AddCurso/>
      },
      {
        path: '/admin/detalleCurso',
        element:<DetalleCurso/>
      },
      {
        path: '/admin/agregar-st-cur',
        element:<AddStCur/>
      },
      {
        path: '/admin/docente',
        element:<Docente/>
      },
      {
        path: '/admin/addDocente',
        element: <AddDocente/>
      },
      {
        path: '/admin/agregar-asignatura-docente',
        element: <AgregarAsignaturaDocente/>
      },
      {
        path: '/admin/asignatura',
        element:<Asignatura/>
      },
      {
        path: '/admin/agregar-asg-cur',
        element: <AgregrarAsignaturaCurso/>
      },
      {
        path: '/admin/addAsignatura',
        element:<AddAsignatura/>
      }
     ]
    },
    {
      path: '/admin',
      element: <AuthAdminLayout/>,
      children:[
       {
         path: '/admin/authAdmin',
         element:<AuthAdmin/>
       }
      ]
    },
    {
      path: '/teacher',
      element: <TeacherLayout/>,
      children:[
       {
         path: '/teacher/index',
         element:<IndexTeacher/>
       }
      ]
    },
    {
      path: '/teacher',
      element: <AuthTeacherLayout/>,
      children:[
       {
         path: '/teacher/authTeacher',
         element:<AuthTeacher/>
       }
      ]
    },
    {
      path: '/student',
      element: <StudentLayout/>,
      children:[
       {
         path: '/student/index',
         element:<IndexUser/>
       }
      ]
    },
    {
      path: '/student',
      element: <AuthUserLayout/>,
      children:[
       {
         path: '/student/authStudent',
         element:<AuthStudent/>
       }
      ]
    }
])

export default router;