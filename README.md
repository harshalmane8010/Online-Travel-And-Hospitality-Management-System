2- 832 LINE
3- 1218 LINE

CTS FILE  :                                                                                                           

let person={
	name:"abc",
	city:"chennai",
	age:45
}


let person={
	"name":"abc",
	"city":"chennai",
	"age":45
}


  console.log(data);
        console.log("Line 32:"+Object.toString(data))
        if (data.status === "ok") {
          //console.log(data.userType);x`
          alert("login successful");
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("userType", data.roles);
          window.localStorage.setItem("loggedIn", true);
          
          console.log( window.localStorage.getItem("token", data.token))
          console.log(window.localStorage.getItem("userType", data.roles))
          console.log(window.localStorage.getItem("loggedIn", true));
          
          // if (data.userType == "Admin") {
            
          //   return (window.location.href = "./admin-dashboard");
          // } else {
          //   window.location.href = "./userDetails";
          // }
        }
========================
 {/* unauthorized route */}
		{isL}
          {!isLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/" element={<Login />} />
            </>
          )}

          {/* ProtectedRoutes */}
           <Route element={<ProtectedRoute />}>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            {userType != "Admin" ? (
              <>
                <Route path="/" element={<Navigate to="/userDetails" />} />
                <Route path="/userDetails" element={<UserDetails />} />
                <Route path="/products" element={<Product />} />
                <Route path="/admin-dashboard" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/userDetails" element={<Navigate to="/" />} />
                <Route path="/products" element={<Navigate to="/" />} />
                <Route path="/admin-dashboard" element={<AdminHome />} />
              </>
            )}
          </Route>

          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />


==============================
function Navbar({ isLoggedIn, userType }) {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"></li>
        {!isLoggedIn && (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          </>
        )}
        {isLoggedIn && userType == "Admin" ? (
          <li className="nav-item">
            <Link to="/admin-dashboard" className="nav-link">
              Dashboard
            </Link>
          </li>
        ) : (
          isLoggedIn && (
            <>
              <li className="nav-item">
                <Link to="/userDetails" className="nav-link">
                  User Details
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Product
                </Link>
              </li>
            </>
          )
        )}

        <li className="nav-item">
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

===============================================


IDE:-
	rapid application developement
	compiler (javac classname.java) as soon as when hit save
	debugger
	syntax error while u are writing
	auto intellegence 
	etc
	JAVA Developement IDE:-
		Eclipse - spring framework
		STS	- spring boot, microservices
		Intelij IDEA
		Netbeans
		JCreator
	
Eclipse:-
		Workspace ---> One or more projects --> one or more packages
        along with JRE system library--> classes and interfaces etc	

Namming conventions of java:-
	
		class name & interface - camel case
				Each word starting character capital letter
		variable name:-
				Starting word all letters must be lowercase
				From second word onward each word starting character should be in captial
				letter
		method name
				Starting word all letters must be lowercase
				From second word onward each word starting character should be in captial
				letter followed by ()
		constant variable
		
variable:-
		scope:-
			That variable how far it can be accessable
		Lifetime:-
			How long that variable is in the memory
		
		1. instance variable
			A variable declared inside the class outside of any method
			scope -  through out the class
			lifetime - as long the object is existing in the heap memory
		2. static variable
			A variable declared inside the class outside of any method with the static keyword
			scope 
			lifetime
		3. local variable	
			u need to initalize explicitly	
			scope - with in the block 
			lifetime - as long that method is in execution 

Inheritance:-
		1. IS-A (extends)	
			1.1 Single Inheritance
			1.2 Multiple Inheritance
			1.3 Hierachial Inheritance
			1.4 Multilevel Inheritance	
			1.5 Hybrid Inheritance
		2. HAS-A (Association)
			 creating an object of one class to other class

			 2.1 Composition (Strong Association)
				 If the objects are in the HAS-A relationship. If we remove one object also removes 
				 other object that relationship is called as composition 
				
				 Strongly dependent on each other objects

				 Strongly coupled application

			 2.2 Aggregation (Weak Association)
				If the objects are in the HAS-A relationship. If we remove one object still other object
				can exists is called as aggreagtion

	When to use IS-A vs Has-A
	=========================
			IS-A
				Person is a Human
				Laptop is a Electronic
				Car is a Vechile
			HAS-A
				Human has-a Heart
				Laptop has-a CPU
				Car Has-a Engine
	
	


Class:-
		1. Userdefined class
				Company
				Person
		2. Predefined class
				Scanner - variable, function	
				String  - variable,function
				Arrays
				System
				Math
			
Polymorphsim:-
==============
			doing a perticular task in different forms 
			sendParcel - task
			parcel service:-
			Eg:-
			Method overloadding - method with same different arg is called as method overloadding
			sendParcel(IndiaPost){
				nearst post office
				pack the parcel
				fill a form
				payment
			}
			sendParcel(Courier){
				nearest courier office
				pack the parcel
				give from and to address
				payment
			}
			sendParcel(byfriends){
				pack the parcel
				give it ur friend
			}
			sendParcel(byself){
				pack the parecel
				goto the delivery address
			}
			Method overidding:-
				Method with same name same arg is called as method overidding



			Eg:-
			class Payment{
					public String makePayment(String cash){
						s.o.p("cash payment") - forms cash
					}
			}

			class UpiPayment extends Payment{
					public String makePayment(String upiId){
						s.o.p("upi payment") - forms upi
					}
			}
			
			Polymorphism:-
				1. compile time polymorphsim / method overloading	
						binding - compile time binding / early binding / static binding
						During compile time itself the binding decision will be made 
						is called as compile time binding
				2. Runtime polymorphsim / method overidding
						binding - runtime binding / late binding / dynamic binding
						During compile time itself the binding decision will be made 
						is called as runtime binding
				
				Method Binding:-
						Deciding for the method call which function definition it has to execute
						it is also called function call resolving
						JVM takes biding decision
						1. method name
						2. no args
						3. type of args

						Method call
						Method definition
								void makePayment(){ //method definition
									statement 1;
									statement 2;
									statement 3;
								}	

								makePayment(); // method call
Abstraction:-
				Showing the essential and its implementation is called as abstraction
				
				
				public void add(int a,int b){ // function definition or implemented function
				
				}
			
				public void multiply(int a,int b); // function with out definition
														unimplemented method
														abstract method	

				1. Abstract class
				2. Interface
Exception in Handling in Java:-
===============================
				Exceptions are not syntax error
				Exception gets created at Runtime
				Exceptions are abnormal condition that happens during the code excution(runtime).
				Exception need to be handled by the programmer using try catch
			
				what if the exception are not handled by programmer
					- your program execution abruptly stops and will not allow to run the remaining 
					  lines of code 
				
				what if the exception are handled by programmer
					- your program execution gracefully and keeps executing
					  the remaining lines of code then it stops


				1. How do u handle exception in java:-
				====================================
						try{
							// anticipating or expecting the lines of code possible create an exception
						}
						catch(Exception e){   //handler to handle the exception

						}
				2. Exception propogation
				========================
						throws 

Two types of exception:-
===============================
		1. Checked exception
		2. Unchecked Exception / Runtime ExceptionD

Array:-
======
		To store group of similar elements or type in a single variable
		Array is fixed size
		int[] marks=new int[5];
		
		1. Primitive type 
		2. non primitive / Reference type	

		Array can hold both primitive and non primitive type
Advantages:-
		u can access element through index(Random access)
		
problems:-
		size is fixed - cannot increase or decrease the size
		If u have more no of insertion and deletion performance issue

Collection:-
		To store group of similar elements or type in a single variable
		Collection can hold only non primitive / reference / objects
		Dynamic in size
		types of Collection  - list, set, queue, map
		Each collection is backed by one datastructure 

Wrapper classes
	converting primitive type to a non primitive type vice versa

	primtive type 						wrapper classes		
	byte									Byte
	short								Short
	int 									Integer
	long									Long
	float								Float
	double 								Double
	char									Character		
	boolean								Boolean


	U have to choose a collection based on following
		1. Order or unorder
		2. duplicate or not
		3. null or not

Java applications types:-
		1. console application - J2SE - input output can be given and seen in the console
		2. window application - J2SE - swing, applet - notepad,paint
		3. web application- JDK + Jakarta EE- client server application
		4. enterprise application - J2SE + J2EE- client / server application very complex
web application:-
		client 
		server - configure the server
				 web server - Tomcat, glashfish, jetty, etc
				 application will be running inside the tomcat server(deploying the application)
				 J2EE - servlet, jsp, websocket, annotation

		J2EE - java enterprise edition
				
				 
SPRING FRAMEWORKS:-
		- Jdk + spring framework dependencies
			

	spring core:-
		- jdk + spring core container - beans, context, el, core
		- IOC - Inversion of control 
			java application
				programmer - manages the object - create, updating ,deleting
				container or context - is going manage your objects - IOC
				two types container:-
				1. BeanFactory(IOC container)
				2. ApplicationContext(IOC container)
	  			
				ApplicationContext is an interface			
				which is implemented by the classes
				1. ClassPathXmlApplicationContext
				2. FileSystemXmlApplicationContext
				3. AnnotationConfigApplicationContext	
					
		- Dependency Inject
	Bean Scope:-
	==========
			1. singleton scope - only single instance object gets created. 
								 always / share the same object
			2. prototype scope - it creates a new object when u request
			3. request
			4. session
			5. application
	Bean Lifecycle:-
	==============
			
	Depenedency Injection:-
	======================
			
			If one class members wanted to be accessed in another class(Inheritance -  HAS-A)
			one class object wanted to access the members another class object
			Classname ref=new Classname();
			Dependency Injection
			Spring - Loosly coupled

	Encapsulation:-
	==============
			Wraapping your data and method together is called encapsulation
			class - is the example for the encapsulation
			The other classes should access data members directly


	MVC Architecture:-
	=================
				- Model View Controller
					Model - Data
					View - Presentation - html, jsp - to display the model
					Controller - Servlet - used to controll the flow of the request
												and the response
												Model will be prepared by the controller


	Front Controller MVC Architecture:-
	===================================
					Front controller - servlet
					model
					controller
					view
	JDBC:-
	=====
			
				Java program --> databases (mysql,oracle,postgresql,sqlalcahmy,db2,sybase)
				syntax					syntax(sql)	
				compiler				parsing
				JRE	 					query execution plans
										select a low cost excution plan
										query execution engine will execute the query

				Java syntax					SQL syntax
								   Driver			
										
				
				java ----- mysql
					mysqldriver
				
				java------postgresql
					postgresqldriver

				java------oracle
					oracledriver
			
				

				JDBC API:-
				java.sql
				javax.sql
	
						Connection(I) - Interface
						DriverManager(C) - Class
						Statement / PreparedStatement / Callable Statement(I)
						ResultSet(I)

				JDBC steps:-
				============
				Prerequiste:-
					* Add the Driver dependency  
				1. Load the Driver Class
						Class.getName("package.Driver");
				2. Create a connection object
						Connection con=DriverManager.getConnection(url,username,password);
				3. Statement / PreparedStatement / CallableStatement 
						Statement stmt=con.createStatement(); // create an Statement object
										(Static sql Query)
										OR
						PreparedStatement pstmt	= con.prepareStatement();
										(Dynamic sql Query)
										OR
						CallableStatement cstmt=con.prepareCall();
										(Stored procedure / function)

				4. execute the query

					ResultSet executeQuery(String query); //DML - read operation - select
					int executeUpdate(String query); //DML - write operation - insert,update,delete
					boolean execute(String query); //DDL & DML query

				5. close the resource object
						close statement
						close resultset
						close connection


					Employee e=new Employee(); //not a java resource object

					Any java class / object holds a computer hardware then that class 
					object is called as java resource object

					Scanner s=new Scanner(System.in);
					File f=new File("c:/users/demo.txt");

					Connection 

					close();

JPA:-
	It's an specification or standard how objects can be persisted in the persistent storage
	JPA - set of annotation,interfaces and abstract classes
	JPA - EntityManagerFactory(I), EntityManager(I)
					
								JPA   
								 | annotation
								 | interfaces,AC
				|=====================================| 
				|implemented by						| implemented by
			Hibernate(ORM) 						EclipseLink(ORM)
				|
				|
			   JDBC
				|
				|
			  mysql


								List(I)
								  |
					|===============================|
				ArrayList		LinkedList        Vector

				List alist=new ArrayList();




Steps  for hibernate:-
			prerequiste 
			1. hiberate core dependecies
			2. db driver dependencies
			Step 1: create Session factory
						SessionFactory sf=new Configuration().configure().buildSessionFactory();
						Session factory need one hibernate configuration 
						1. xml - hibernate.cfg.xml
						2. java 
			Step 2: create a session
						Session session=sf.openSession();
			Step 3: begin the transaction
						session.beginTranasction();
			Step 4: execute the query using jpa / hibernate method
						session.save(); // insert
						session.get(); //select
						session.update(); //update query
						session.delete();//delete query
			Step 5: commit or rollback the transaction
						session.getTransaction().commit();
						session.getTransaction().rollback();

			Step 6: close the session
						session.close();
			Step 7: close the session factory
						sf.close();
					

			SQL- SELECT columnlist  FROM tablename - table and columnnames
			HQL- SELECT variablenames FROM Entityname - entity and the fields




	Bus					Routes
	1					88D
	busId				routeId
	model				from
	seating				to
	type				distance

bms
		hibernate-core	
		mysql connector

traveldb
		
Spring mvc + Hibernate:-
========================
		1. Add Dependencies spring-webmvc, jakarta.servlet-api.jar
		2. web.xml
		3. configure DispatcherServlet in web.xml
		4. add bean configuration file servletname-servlet.xml
				<?xml version="1.0" encoding="UTF-8"?>
				<beansxmlns="http://www.springframework.org/schema/beans"xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"xmlns:context="http://www.springframework.org/schema/context"xmlns:tx="http://www.springframework.org/schema/tx"xmlns:mvc="http://www.springframework.org/schema/mvc" xsi:schemaLocation="  http://www.springframework.org/schema/beans  http://www.springframework.org/schema/beans/spring-beans.xsd  http://www.springframework.org/schema/context  http://www.springframework.org/schema/context/spring-context.xsd  http://www.springframework.org/schema/mvc  http://www.springframework.org/schema/mvc/spring-mvc.xsd  http://www.springframework.org/schema/tx   http://www.springframework.org/schema/tx/spring-tx.xsd">
		5. In bean configuration file component scan to stereotype annotations
		6. Add dependecies hibernate-core, spring-orm, mysql
				create a bean for Datasource
				create a sessionfactory bean object inject datasource bean
				create transactionmanager bean inject sessionfactory
				create spring-tx bean inject transactionmanager
		7. takes a lot of configuration
		8. 	


Springboot:-
===========
		create an production grade standalone enterprise application very rapidly
		spring boot are oppiniated
		spring boot dependecies are starts spring-boot-starter
		less configuration u can focus application logics
		internal tomcat server

		how do u create Spring boot appication:
		-------------------------------------- 
		1. spring initilizer
		2. sts
			




	Rest API:-

	POST http://localhost:9090/trains - client will post a train data to server
	GET http://localhost:9090	/trains/trainid - client is requesting to give train details by id
	GET http://localhost:9090/trains - client is requesting give all train details
	DELETE http://localhost:9090/train - client is asking to delete train from the server
	PUT http://localhost:9090/train - client is asking to update a train in the server



		Http Status 
			100-199 - informational
			200-299 - success
			300-399 - Redirection
			400-499 - Client side request packet error
			500-599 - Server side error

Validation:-
============
			validate the integirity of the data
			Client Side validation- javascript we validate the data
						 before the being send to the server we validate the data that we have given.
			Server Side validation - After the client sends a request once server recieves the request by that time
						on server we do validate the data


Junit:-
======
		Testing - Quality Assurance(QA team)
		Unit testing
		Java Projects - to perform unit test - Junit Framework
		Junit  is a third party framework. we need to add as an dependency
		Types of Unit Testing
		1. BDD - Behaviourl driven developement -  first need to write source code after u write case
		2. TDD - Test Driven developement 

		Junit:-	
			Test case - it is a java method to test the source code function. @Test annotation
			
			Test Case
			src->
			class Calculator{
					public int add(int a,int b){ 
						return a+b;
					}
					public int divide(int a,int b){ 
						if(b!=0){
							return a/b;
						}
						else{
							throw new ArithmeticException();
						}
					}
			}

			SerialNumber    testcase name  	  input		expected 		actual		result    comments		
		
				1			addTestcase	  10,20	 		30			30			PASS	
					
				2. 			divideTestcase 20,10			2			2			PASS
				
				3. 			divideTestcase 20,0		    10             20         ArithemeticException

Mockito:-
========


Spring security:-
================	
			Servlet - is a java program can cappable of handle request or response
			Filter -  Filter is also a java program can capable of intercept the request,response


			Steps to create a jdbc authentication spring security:-
			======================================================
			1. In UserController create an end point for user creation
					POST /user-api/user
					
			2. Dto Class:- UserDto
					@Data
					@AllArgsConstructor
					@NoArgsConstructor
					public class UserDto{
						private int userId;
						private String email;
						private String password;
						private String phone;
						private List<String> roles;
					}
			3. User Entity class
					@Data
					@AllArgsConstructor
					@NoArgsConstructor
					@Entity
					public class User{
						@Id
						@GeneratedValue
						private int userId;
						private String email;
						private String password;
						private String phone;
						@OneToMany(cascade=CascadeType.ALL)
						private List<String> roles;
					}
					@Data
					@AllArgsConstructor
					@NoArgsConstructor
					@Entity
					public class Roles{
						@Id
						@GeneratedValue
						private int roleId;
						private String roleName;
					}
			4. create a UserService
					public UserDto createUser(UserDto userDto){
					}

			5. create UserRepository manages the User entity
			6. create RolesRepository manages the Roles entity
	
			public class Emi{
				public boolean login(){
					//logic login
					addTworandomNumber();
				}
				public long addTworandomNumber(){
					return Math.random()+Math.Random();
				}
			}
			interface SpecialBird {
				
				public void makeSound();
			} 
			interface Bird extends SpecialBird{
				public void fly();
			}
			

			class Dove implements SpecialBird{
				public void fly(){
				}
				public void makeSound(){
				}
			}

			class Penguin implements Bird{
				public void makeSound(){
				}
			}

			Dependency Inversion:-				
				Dependency should depend on abstraction not on the implemenation

					interface UserRxepository extends JpaRepository{
					}
					@Service
					public class SimpleJpaReposioty implements JpaRepository{
							// all the abstract method jpareposioty method got implemented inside
							// SimpleJparepository
					}

				
					public class UserService{
						@Autowired
						private JpaRepository jpaRepository;
					}

			7. add spring-boot-starter-security
			8. configure the spring security and allow the user registration
			8. encode the password while user registration





INTERVIEW FILE :
Final Evaluation Questions:-

Core Java:-
	1. JDK vs JRE vs JVM
	2. JVM Architecture
	3. Array in java? Arrays utility class
	4. String? Ways to create a string? Immutable or muttable, How strings are stored in memory(SCP)?
	5. classes in java ? 
	6. members of a class?
			member variable, member function, constructor, static block
			member varaible  - static member variable, instance member variable
			member function - static member function, instance member function
	7. When an object created for a class. How memory gets allocated in jvm?  
			
	8. primitive type vs reference type ? memory allocation for those types?
	9. Encapsulation  -> data hiding , making all the fields and create getters / setters to access the data memebrs
	10.polymorphsim:-
			1. Compile polymorphism (method overloading)/ - Binding - compile time binding or early binding or static binding
			2. Runtime polymorphism(Method overriding) - Binding - runtime binding or late binding or dynamic binding
			
			Object Casting:- 
				1. upcasting
				2. downcasting
	11. Abstraction:-
			1. Abstract class
				
			2. Interface
			
	12. When to use abstract class vs interface

	13.  Basics package.
	14.  Acccess Modifier. 
	15.  Non access modifier? final, static ,synchronized, etc
			If use non  access modifer it changes the default behaviour

				class level
				variable level
				method level

				final class Demo{
					static final int a; // static member varaible -method area memory - initialization
					final void add(){ // static method - method area memory -cannot override

					}
				}
				class Demo1 {
				}
			
	16. 	Inher	itance
			to access the mebers of one class to another classes

			IS-A (extends)
			1. single Inhritance
			2. Multiple Inheritance
			3. Multilevel Inheritance
			4. Hierachial Inheritance
			5. Hybrid Inheritance

			Has-A (creating an object of one class inside another class) - Association
			1. Aggregation (Weak Association)
			2. Composition (Strong Association)

	17. When to use IS-A vs HAS-A
	18. Difference between composition(tightly coupled application) vs aggregation(Loosly coupled application)
	19. extends vs implements
	20. Abstract class and interface
				HAS-A inheritance is not possible
				IS-A inheritance is possible

	21. If a class is a final class
				HAS-A inheritance is possible
				IS-A inheritance is not possible
	22. Collection
				class hierachy of collection
				Each collection classes are backed by one datastructure
				
					ArrayList - Array DS
					LinkedList - Doubly linked list ds
					vector - array ds
					
					Hashset - hash table ds
					LinkedHashSet - Hashtable _ LinkedList
					TreeSet - HashTable + Sorting algorithm
					
					HashMap - hash table
	23. When to use what collection class
					ordered or unoreder
					duplicate or not
					null or non null

	24. JDBC
				Steps to connnect to DB
				1. load the Driver class
				2. Create a connection Driver.getConnection(url,username,password)
				3. statement / PreparedStatement / CallableSatetment		
				4. execute / executeUpdate / executeQuery
	25. Exception Handling
				What is exception
				Types of Exception
					1. Checked Exception
					2. Unchecked Exception
				What if u are not handle an exception inside ur application  / if u handle an exception in ur application
				How do u handle an exception
									
						try{
							
						}catch(Exception e){
						
						}finally{
							ceaning up the resources
						}
				Exception propogation
					The programmer who are writting the code is not willing to handle the exception with try catch
					instead he is propogating / delegating the exception to the caller function

					void add(){
						------;
						-----;
						try{
							exception  - handle the exception
						}catch(Exception e){
						}
						-----;
						-----;
							
					}	

					another way:-
					
					void add() throws Exception{  //exception propogation
						------;
						-----;
						
							exception  - handle the exception
						
						-----;
						-----;
							
					}		

					How do u propogate thr checked exception / unchecked exception - diff checked vs unchecked 

					how do u create ur own exception / custom exception
		26. Annotation
				Meta data or Instruction is given to program during runtime is called as annotation
				1. before a class - class level annotation
						@RequestMapping
						@RestController
						@Service
						@Component
				2. before an interface - interface level annotation
						@FunctionalInterface
				3. Before a method - method level 
						@GetMapping
						@PutMapping
							
				4. before variable
						@Autowired
						@NotNull
						@NotBlank
					
				5. Before contrucctor
						@Autowired
				6. Before parameters
						@RequestBody
						@Valid
						@PathVariable 
				How your own / custom annotation
		
	
logging
	
sonar qube

maven

git
		Repository - local git vs remote git(github)
		git flow - 
				git init - write program - git add .  git commit ,git remote add origin giturl, git push   	
				git clone
				git fetch
				git fork	
			
Spring framework
			lossly coupled application
			IOC 
				Bean Factory
				ApplicationContext
						ClassPathXmlApplicationContext
						AnnotationConfigApplicationContext
						WebApplicationContext
			Bean Configuration +  bean definifion
			1. xml + xml
			2. xml + Annotation
			3. Java + Annotation
					@Configutation + @Bean
					@Configuration + @ComponentScan + @Component | @Controller | @RestControlller | @Service | @Repsoitory
			Dependency Injection	
			Types  of dependency injection
			@Autowired
			Bean life cycle method
			Bean Scope - singleton | prototype

			AOP - basics
			mvc flow design pattern
			front controller design pattern	
			Spring mvc flow
			spring rest flow

Spring boot
			what is spring boot?
			why spring boot over plain spring framework
			@SpringBootApplication @Component
			Advantages of spring boot
			how spring boot makes application to be implemented very rapidly
			steps to configure database inside the spring application
			spring data jpa
			spring rest api			
				- Rest Archotectutral style rule
microservices:-	
			1. distributed architecture
			2. monolithic vs microservice
			3. Microservice architecture advantages
			4. Feign Client / Rest Template - synchronus 
			   webclient - asynchronous
			4. Issues are there distributed microservice architecture
					communcation
					fault tolerance		
					managing the configuration 
				
				resolve the issue design pattern
					1. service discovery and registry
					2. Load Balancer
					3. gateway design pattern
					4. circuit breaker
					5. config client server

				spring cloud 2025.0.0
					1. netflix Eureka Registry and Discovery
					2. Client side load balancer / Server Load Balacer - @LoadBalancer
					3. Spring cloud gateway API
					4. Resillence 4j
					5. Spring cloud config server]\
virtalization
		types of virtualization
		virtual machine
		how gcp use virtalization and gives u one virtual machine to u
		spring boot application ->jar file -> run inside the virtual machine	
docker containers and GCP
		GCP 
			Saas - hardware + OS + ms office + java + sts + eclipse + vsc
			Pass - hardware + OS
			Iaas - hardware - cpu, memory, network
			region and availability zones
			virtual machine
			vpc
			create a sql nonsql databases
			
		docker commands
				docker info
				docker version
				docker image - docker build 
				docker run - docker run
				docker stop
		Spring boot application --> jar file ---> Dockerfile --> dockerize the application to a docker image---> docker run --> 
		dockerized application will be running inside the container


		deploying spring boot app inside virtual machine vs dockerize spring boot app and running inside diff and advatages 

		How do u containerize the spring boot application?
				Spring boot application --> jar file ---> Dockerfile --> dockerize the application to a docker image---> docker run --> 
				dockerized application will be running inside the container
Html/ css - 

js -  Synchronus /  Asynchronus

	Asynchronus
		callback
		callback hell
		Promises
		Asych Await
		
	external API call;
	1. AJAX - XMLHttpClient
	2. Fetch API - returns a promises
	3. Axios - external library	
	Fetch API vs Axios
	
Typescript:-
	
	typescript is a superset js.
	static in type
	classes, modules, interfaces etc

React js
		What is react js / Why react
		component 
		types of component -  remember the syntax
			1. class component
			2. functional components
		props and state
		share the data from parent to child.  from child to parent
		life cycle methods of component
		React Hooks  - functional component
		How do u share data between component - props
		props drilling
		How do u manage state in react component
		
			useState() -  Easiest way to manage the state
			useReducer() - more defined code of your state

			useContext()
			Redux

		useContext - how to share state data to child component
		props vs useContext 
		useState vs useReducer
		state - component local state - useState / useReducer- simple
			   component global state - Redux  - complex
		How to make an external api call
			fetch api - post, get, put, delete
			fetch api asych await
			axios
		useEffect
		Form validate - onBlur,onChange,onSubmit
		SPA
		React Routing
			steps to install and implement react routing inside the react application
			1. install the routing
			2. main.tsx u need add <BrowserRouter> from the react routing
			3. app.tsx add Routes Route with path component to be loaded
			4. nested route
			5. dynamic Pathvariable
			6. useParam
			7. useNavigation
		Remaining lifecycle hooks

Java 8 features
	1. inside the interface u can have also implemented methods
		interface Demo{
			static void add(){
			}
			default void add1(){
			}
		} 
	2. static vs default method
	3. functional interface
			1. Predefined functional interface
				Predicate
				Consumer
				Supplier
				Producer
			2. customer functional interface


	4. Lamda expression
			
	5. Stream API
			
				1. source
					array / collection
					.stream() - method to create a stream
					Stream.of() - method to create a stream
				2. intermediate operation
					filter
					map
					Sorted
				3. terminal operation
					forEach
					collect
					findFirst
	6. Optional
				isEmpty()
				isPresent
				.get()
				.orElseThrow




NOTES FILES  :
GIT:-
	Manage your source code
	git version control system or tool
	History
	
	Git Repositories:-
			git repositories are used to manage project source code
			1. Local Repository - .git
					-> project source code has to be managed inside the machine
			2. Remote Repository - github
					-> project source code will be shared and collaberated many members
			first local repository then u have to bring the code to remote repository

	git and github u can collaberate as a team in the project	

	Install git
	

	git init - The git init command is used to initialize a new Git repository

		   It prepares a new directory to be used for version control by Git, 
		   creating the necessary data structures (referred to as a .git directory) that store the repository's configuration and history.
		
  		  The .git directory structure
			HEAD: The HEAD file is a reference to the current branch that's checked out
			config: This file contains repository-specific configuration settings - 
					user info, remote url, branch config
			objects/:- The objects directory stores all the data for your commits - 
					files, commit tree structure,data will be stored in compressed format
			refs/: The refs directory contains references to commit objects in the repository,
			hooks/:- used for git collabration workflow
			index: The index file acts as the staging area ("index") for Git 
	Git config:- to set username and email who is using the git

		git config user.name "Your Name"
		git config user.email "youremail@example.com"

	Git config --list:- list u git configuration details

	git add:-  adds a change in the working directory to the staging area
	git commit:- captures a snapshot of the project's currently staged changes. a commit is a snapshot of your repo at a specific point in time.
		     

	 git clone:- is used to copy an existing repository
Stage 1:
========
		html 
		Browser - is a s/w or application capable generating http request and process the
				  response packet
				- parse html renders the css styles, executes the js script
				- html equavelent DOM Tree structure
		Browser - Html parse, Javascript execution engine ,from DOM tree Rendering engine renders		

Spring Core:-
	IOC Container - ApplicationContext
		Bean Configuration
		1. Xml Bean Configuration + Bean Definition
			<?xml version="1.0" encoding="UTF-8"?>
			<beans xmlns="http://www.springframework.org/schema/beans"
    				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    				xmlns:context="http://www.springframework.org/schema/context" xsi:schemaLocation="
        			http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        			http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd"> <!-- bean definitions here -->
				<bean class="xyzcompany.shopping.Company"></bean><!-- Bean definition-->
				<bean class="xyzcompany.shopping.Trainee">
				</bean><!-- Bean definition-->
			</beans>
		====================================================
		2. Xml Bean Configuration + Bean Definition(@Component)
		====================================================		
		3. Java Bean Configuration + Bean Definition (@Bean)
			@Configuration
			public class JavaBeanConfiguration {
				@Bean //Bean Definition
				public Product company() {
					return new Company();
				}
				@Bean //Bean Definition
				public Cart employee() {
					return new Employee();
				}
				
			}
		====================================================
		4.Java Bean Configuration + Bean Definition(@Component)
			@Configuration
			@ComponentScan(basePackages="com.example")
			public class JavaBeanConfiguration {
				
			}
			
			com.example
			@Component
			public class Employee{
			}
			com.example
			@Repository
			public class Company{
			}
		=======================================================
	Dependency Injection:-
		1. Constructor based injection
		2. Setter based injection	
		
	AOP:-

Spring MVC:-
===========
	Spring MVC Application:-
		1. create an maven project
		2. select architype webapp
		3. check the java version if it is required change the
		apprpriate java version
		add Maven spring depdencies from mvnreporistory(remote repo):-
			4. spring web dependecies
			5. spring web mvc dependecies
			6. servlet dependences - jakarta servlet-api
			7. jsp dependencies - jakarta jsp
			8. hibernate dependencies
			9. mysql driver dependecies
			10. configured a tomcate server into the IDE
			    start the tomcat server - if 8080 port is not available
					  configure the port
			11. run your application inside the tomcat server
					right click on the project --> Run as -> Run on server

			12. In Webapp->WEB-INF->web.xml -> u need to configure Dispatcher servlet
			<servlet>
				<servlet-name>app</servlet-name>
				<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
				<init-param>
			<param-name>contextConfigLocation</param-name>
			<param-value>/WEB-INF/xmlbeanconfig.xml</param-value>
			</init-param>
			</servlet>

			<servlet-mapping>
				<servlet-name>app</servlet-name>
				<url-pattern>/</url-pattern>
			</servlet-mapping>
	
			13. xml bean configuration file:
			<?xml version="1.0" encoding="UTF-8"?>
			<beans xmlns="http://www.springframework.org/schema/beans"
    			xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    			xmlns:context="http://www.springframework.org/schema/context" xsi:schemaLocation="
        		http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd"> <!-- bean definitions here -->
			<context:component-scan base-package="springfirstapp"></context:component-scan>	
			<bean id = 'viewResolver' class = "org.springframework.web.servlet.view.InternalResourceViewResolver">
    				<property name="prefix" value="/WEB-INF/views/"></property>
    				<property name="suffix" value=".jsp"></property>
			</bean>
			<!--hibernate bean-->
			</beans>

		14. Dao layer
				db operation u have to do
					- sesssionfactory
					- session
					- beginTransaction
					- db operation
					- commit or rollback the transaction
					- close session
					- close session factory
=================================================================================================================
spring boot:-
		It is an opiniated - what project u want - spring boot - create project, configuration
							   project			
							 - Production grade application	
			

		Spring Boot helps you to create stand-alone, 
		production-grade Spring-based applications 
		that you can run. 

		We take an opinionated view of the Spring platform and third-party libraries, 
		so that you can get started with minimum fuss. 
		Most Spring Boot applications need very little Spring configuration.


		There are 2 ways u can implement Spring boot project
		1. start.io/initialzer
				spring boot - spring mvc
				
				
		2. STS IDE - Project boot starter project
					Restfull application

		spring data JPA - they have created all db code they kept is inside the 
							spring data jpa project
							
					How to use spring data jpa into you project
					1. u need to spring data jpa starter dependency
						
					<!--
					https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-jpa -->
					<dependency>
						<groupId>org.springframework.boot</groupId>
						<artifactId>spring-boot-starter-data-jpa</artifactId>
					</dependency>
			
					2. DB driver dependency
							mysql connector driver dependency
							<!-- https://mvnrepository.com/artifact/com.mysql/mysql-connector-j -->
							<dependency>
    							<groupId>com.mysql</groupId>
    							<artifactId>mysql-connector-j</artifactId>
    							<version>9.2.0</version>
							</dependency>

					3. db configuration
						spring.datasource.url=jdbc:mysql://localhost:3306/productdb?createDatabaseIfNotExist=true
						spring.datasource.username=root
						spring.datasource.password=root@123
						spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
						spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
						spring.jpa.show-sql=true
						spring.jpa.hibernate.ddl-auto=update

					4. JPA - Java Persistence API
							@Entity
							@Id - only those will be taken and gets persisted in the db

jstl:-
		1. add dependency jstl
				<dependency>
					<groupId>jakarta.servlet.jsp.jstl</groupId>
					<artifactId>jakarta.servlet.jsp.jstl-api</artifactId>
				</dependency>
				<dependency>
					<groupId>org.glassfish.web</groupId>
					<artifactId>jakarta.servlet.jsp.jstl</artifactId>
				</dependency>
		2. include a tag library
				<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

		3. then use the jstl tags
				<table border="2">
		<thead>
			<tr>
				<th>PRODUCT ID</th>
				<th>PRODUCT NAME</th>
				<th>PRODUCT QUANTITY</th>
				<th>PRODUCT COST</th>
			</tr>
		</thead>  
		<tbody>
			<c:forEach items="${products}" var="product">
				<tr>
					<td>${product.id}</td>
					<td>${product.name}</td>
					<td>${product.quantity}</td>
					<td>${product.cost}</td>
				</tr>
			</c:forEach>
		</tbody> 
	</table>





===================================================================
	JDBC  - u have to write boilarplate code for every operation
		manully u need a database and tables 

		Loaded your driver.class
		Connection 
		Statement or preparedstatement or callablestatement
		Query
		execute() or executeUpdate() or executeQuery
		ResultSet
		close()
		
		DB - insert, delete, update, select
				
	JPA (Java Persistence API) - package jakarata.persistence
		what to do
		standard and specification
		How a java object can persisted in the persistence storage

		class Student{
			private int id;
			private String name;
		}
		class Main{
			p s v m(String[] args){
				Student s=new Student(100,"xyz");
				
			}
		}
			studentdb
				student
				id  name
				100 xyz
	Hibernate implementaion JPA
			how to do
			java ---> store ---> Database
			ORM
			O - java object
			R - Relational database table
			M - Mapping

			--> avoid boilarplate code
			--> database and the table is automatically
			--> hibernate create a query
			--> managed database 
			--> manage the exception 
		Step 1: hibernate configuration


	
	Hibernate Architecture
	Life cycle
	@Entity @Id
	
	
	Hiberante configuration:-
	===========================
		<?xml version="1.0" encoding="UTF-8"?>
	<!DOCTYPE hibernate-configuration PUBLIC 
  "-//Hibernate/Hibernate Configuration DTD 3.0//EN" 
  "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

<hibernate-configuration>
  <session-factory>
    <property name="connection.driver_class">com.mysql.cj.jdbc.Driver</property>
   <property name="connection.url">jdbc:mysql://localhost:3306/sudentdatabase?createDatabaseIfNotExist=true</property>
    <property name="dialect">org.hibernate.dialect.MySQLDialect</property>
    <property name="connection.username">root</property>
    <property name="connection.password">root@123</property>
    <property name="connection.pool_size">3</property>
    <!--property name="dialect">org.hibernate.dialect.MySQLDialect</property-->
  
    <property name="show_sql">true</property>
    <property name="format_sql">true</property>
    <property name="hbm2ddl.auto">update</property>
    <mapping class="cts.hibernatedemo.Student"/>
    <mapping class="cts.hibernatedemo.Address"/>
  </session-factory>
</hibernate-configuration>




=========================================================================================

Spring Data JPA - Java Persistence API	
			@Autowired
			ProductRepsoitry productRepostory;
		
			interface ProductRepository extends JpaRepository{
			}
				
			interface JpaRepository{
					public Product save(Product);
					public findById(id);
					public findAll();
					public update(javaobject);
					public deleteById(id);
				
			}	
			@Autowired
			ProductRepository s;
			@Repository
			class SimpleJpaRepository implements JpaRepsoitory{
					public save(javaobject){
						//db insert 
						//logic to add a one product details to database
	  					//hibernate code
	 					// SessionFactory - hibernate.cfg.xml
						//session
						//beginTransaction()
						//persist(javaobject)
						//commit or rollback transaction
						//close session
						//sessionfactory close
					}
					public findById(id){
						//db select query 
						//logic to add a one product details to database
	  					//hibernate code
	 					// SessionFactory - hibernate.cfg.xml
						//session
						//beginTransaction()
						//get(javaobject) -
						//commit or rollback transaction
						//close session
						//sessionfactory close
					}
					public findAll(){
						//db select query 
						//logic to add a one product details to database
	  					//hibernate code
	 					// SessionFactory - hibernate.cfg.xml
						//session
						//beginTransaction()
						//createQuery("From Product")
						//commit or rollback transaction
						//close session
						//sessionfactory close
					}
					public deleteById(id){
						//db delete query 
						//logic to add a one product details to database
	  					//hibernate code
	 					// SessionFactory - hibernate.cfg.xml
						//session
						//beginTransaction()
						//delete
						//commit or rollback transaction
						//close session
						//sessionfactory close
					}
					public void update(javaobject){
						//db update query 
						//logic to add a one product details to database
	  					//hibernate code
	 					// SessionFactory - hibernate.cfg.xml
						//session
						//beginTransaction()
						//delete
						//commit or rollback transaction
						//close session
						//sessionfactory close
					}
			}
	
Human 

Employee is a Human
Student is a Human
Bird
Pigeon extends Bird
=======================================================================================================================================
Rest API - Represenational State Transfer
		  - Architectural Style rule
		  - state / resource
				- create state / resource
				- get a state / resouce by id
				- get all state / resources
				- udpate a state / resource
				- delete a state / reource
	1. Uniform resource interface (URI)
				State - product
	    		POST http://localhost:9090/product	- creating a state / resource
				GET  http://localhost:9090/product/id - get the resource / state by id
				GET  http://localhost:9090/product - get all the resource / state
				PUT  http://localhost:9090/product - update the state / resource
				DELETE http://localhost:9090/product - delete the state / resource
				
				State - Laptop
				POST http://localhost:9090/laptop - create a laptop resource
				GET http://localhost:9090/laptop/id - get a laptop resource by id
				GET http://localhost:9090/laptop - get a laptop resource by id
				PUT http://localhost:9090/laptop - update a laptop
				DELETE http://localhost:9090/laptop - delete the state / resource
				
	2. Client-server Architecture:-
				client(Service Consumer)  ---> Server(Service Provider)
	3. Stateless
				http -> stateless
	4. Cacheable
				Make a request to a server GET http://localhost:9090/laptop/200
				Client1 		requet					Server - controller -service-repo-db
							Laptop 200 response	   cache memory - laptop-200 - hiberante cache
				Client2		request						cache memory - laptop-200 - hiberante cache
							Laptop 200 response	
				
				Spring data Jpa repsoitory - 
											    Hibernate - Level 1 and Level 2
															  Level 1 cahce automatically will be
															  available
															  Level 2- cache disabled
												JDBC
												db
	5. Layered system architecture
				controller ---> Service ---> Repository --> DB
	6. Code on demand (optional)		

	class Mobile{   						Mobile m=new Moile()
		private int ImeNumber;       
		private String model;							
		private String make;
			//constructor
			//getter setter
	}

	Rest API - Restaurent management system
				State / Resource - Restaurent
				http://localhost:9090/restaurent-api
				POST http://localhost:9090/restaurent-api/restaurent - create a restaurent resource
				GET http://localhost:9090/restaurent-api/restaurent/id - get a restaurent resourceby id
				GET http://localhost:9090/restaurent-api/restaurent - get all restaurent resources 
				PUT http://localhost:9090/restaurent-api/restaurent - update a restaurent resource
				DELETE http://localhost:9090/restaurent-api/restaurent - delete a restaurent resource

URI Path
				GET http://localhost:9090/restaurent-api/restaurent/{id}
				Static Path - path value that never changes
									/restaurent-api/restaurent
				Dynamic Path - {} path value keep changes

				GET http://localhost:9090/restaurent-api/restaurent/234
				GET http://localhost:9090/restaurent-api/restaurent/444
				GET http://localhost:9090/restaurent-api/restaurent/998
=======================================================================
Spring MVC 			 	vs				 Spring Rest API 		- spring web
@Controller									@Controller
MVC												View
												Rest Architectural Rule
												


SOLID 

		D - Dependency Inversion Pricnical
			Higher module should not depend lower modules
			The dependency should not depend on implementation and it should depend
			abstraction


			@RestController
			public class RestaurentController{
				@Autowired
				RestuarentService restaurentService; // injection abstarction
			}
			===========================================
			interface RestaurentService{
			}
			@Service
			public class RestaturentServiceImpl implemented RestaurentService{  //concerete class or implemented
					@Autowired
					RestaurentRepository jpaRespositry;
			}
			

			public interface RestaurentRepository extends JpaRepository{
			}
			@Respository
			public class SimpleJpaRepository implements JpaRespositry{ //implemented class
			}
			

abstract class
	
concerete class
	if u have a java class if all the methods inside class implemeneted - concerete class

Abstraction:-
			eabstract class 
			interface - abstract methods 

Spring Data JPA:-
				we have only the basic CRUD methods
						save, findbyid, findAll
				but we do not have method for getRestaurentByName(name)
						
				Custom Query Generation method:-
				1. Query Methods
				2. JPQL Query - @Query
				3. SQL Query

Git:-
		version control system
				xyz -> documentation
							initial copy
								page 23 change the pic
								para1 change fonts size
								keep adding more pages
							2nd copy
								chnages
								tearing
							3rd copy
								images
								parapagh
							final copy
									
Event management:-
		1. User - intern 1
		2. Ticket  - intern 2
		3. Event  - intern 3
		4. Notification  - intern 4
		5. Feedback  - intern 5

		Spring Mvc
				ems
				1. User - intern 1
				2. Ticket  - intern 2
				3. Event  - intern 3
				4. Notification  - intern 4
				5. Feedback  - intern 5

		Spring boot Rest Api
				All the interns
				ems - abc intern was  - monolithic 
				1. User 
				2. Ticket
				3. Event
				4. Notification
				5. Feedback
			
		Microservice Architecture:-
			
				Agile Methodologies:-
					1. User stories
						
				intern 1 - User Microservice - Rest API architecture - Own DB
							POST /user  - UserController   -- UserService -- UserRepository 
							GET /user
							GET /user/{id}
							PUT /user
							DELETE /user/id
							
							Tested user microservice - junit & mockito
							Exception handled 
							Validation
							Lombok & Logging
							Git and GitHub
							Authentication & Autherization - Spring security 
							
			
				intern 2 - Ticket Microservice - Rest API architecture - Own DB
							POST /ticket  - UserController   -- UserService -- UserRepository 
									userId/eventId
									should talk another User microservice userId - User
									should talk another Event microservice EventId - Event
									make the ticket
							GET /ticket 
							GET /ticket /{id}
							PUT /ticket 
							DELETE /ticket/{id}

							Tested user microservice - junit & mockito
							Exception handled 
							Validation
							Lombok & Logging
							Git and GitHub
							Authentication & Autherization - Spring security 

				intern 3 - Event Microservice - Rest API architecture - Own DB
							POST /event - UserController   -- UserService -- UserRepository 
							GET /event 
							GET /event /{id}
							PUT /event 
							DELETE /event/{id}
				
Testing:-	
		Unit test - the devloper who writes the code to test the code
				 - Inoreder write the test case and execute the test case external testing framework
				 - Junit Framework - Thirty party testing framework
				 - Junit Framework add this dependency
				 - Junit - 5 - can able to write the test case, run the test case, test case coverage,
							   generate a report


			Test Case method writing rule:-
			==============================
			1. The test case method should be public
			2. Test case method doesnot returns any value
			3. test case method name always starts with the keyword called test
			4. Test case method doesnot takes any argument

		Two developement approaches in testing:-
			1. BDD - Behavioural Driven Developement Apparoach
						SRC - CLASSES	define the methods with logic first
							- then after testing class with test case code to check quality of src code
			2. TDD - Test Driven Developement Apparoach
							- First testing class with test case code to check quality of src code
							- then u write the source class and method logic



package cts.calculatorapp;
// ajay
public class Bank{
	
	public int findInterestRateFromType(String type) {
		System.out.println("findInterestRateFromType method is called");
		if(type.equals("pl")){
			return 1000;
		}
		return 500;
	}

}

=====================================================================================
git:-
	version control system or tool
	History
	





===========================================================================================

Logging

Debugging

Spring Security


Api Documentation
		- Restaurent Management System - Spring Boot - Rest API
				http://localhost:8080/resaturent-api/restaurent - Data 
				
				Service Producer - rms application 
						POST http://localhost:8080/resaturent-api/restaurent - Request body - json data 
						GET http://localhost:8080/resaturent-api/restaurent
						GET http://localhost:8080/resaturent-api/restaurent/1 - path variable
						PUT http://localhost:8080/resaturent-api/restaurent - RequestBody - json
						DELETE http://localhost:8080/resaturent-api/restaurent/1 - path variable
				Service Consumer - person / software / client they can make a request to service producer

				consumer - wanted to consume the restaturent by using api endpoints


				OPEN API - standard specifies how a api documentation should be.
				Swagger - it is an one of the API documentation tool that uses an OPEN API	
						- spring rest api documentation can be generated
						
				Step 1: Add the dependency	
						<!-- https://mvnrepository.com/artifact/org.springdoc/springdoc-openapi-starter-webmvc-ui -->
					<dependency>
    						<groupId>org.springdoc</groupId>
    						<artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    						<version>2.8.5</version>
					</dependency>

				Step 2: Run the application
				Step 3: open the browser http://localhost:port/swagger-ui.html
Spring boot actuator:-
=====================
				
					rms   --> Run on Server --> moniter application

						
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-actuator</artifactId>
		</dependency>


Distributed Architecture:-
===========================
		Distributed architecture is a software system that's 
		spread across multiple interconnected nodes. 
		These nodes can be physical server or virtual servers
		, containers, or serverless functions. 
		
Monolithic Architecture:-
=========================

		Adavatages:-
		============
		Easy deployment – One executable file or directory makes deployment easier.

		Development – When an application is built with one code base, it is easier to develop.

		Performance – In a centralized code base and repository, one API can often perform the same function that numerous APIs perform with microservices.

		Simplified testing – Since a monolithic application is a single, centralized unit, end-to-end testing can be performed faster than with a distributed application. 

		Easy debugging – With all code located in one place, it’s easier to follow a request and find an issue.

		Disadavantages:-
		===============
		Slower development speed – A large, monolithic application makes development more complex and slower.

		Scalability – You can’t scale individual components.

		Reliability – If there’s an error in any module, it could affect the entire application’s availability.

		Barrier to technology adoption – Any changes in the framework or language affects the entire application, making changes often expensive and time-consuming.

		Lack of flexibility – A monolith is constrained by the technologies already used in the monolith.

		Deployment – A small change to a monolithic application requires the redeployment of the entire monolith.

		inventory
			- Order
			- Product
			- Stock
			- Supplier
			- Notification
	
			inventory.jar  ---> server(inventory.jar) 

Microservices Architecture:-
		Microservices are unit of single functionality that are easly deployable, 
		managable, testable and scalable

			order-service - add / upate / delete / find order / findallorder
				ordercontroller --> orderservice --orderrepsoitory --> orderdb
				order.jar   ---> server(order.jar)	
				build ---> deployment

			product-service - add,update, find,delete
				productcontroller --> productservice --productrepsoitory --> productdb
				product.jar ---> server(product.jar)
							---> server(product.jar)
         
			stock-service(.net)
					productcontroller --> productservice --productrepsoitory --> productdb
					stock.jar ---> server(stock.jar)
			supplier-service(java)
					
			notfication-service

		Advantages:-
		Agility – Promote agile ways of working with small teams that deploy frequently.

		Flexible scaling – If a microservice reaches its load capacity, 	
						new instances of that service can rapidly be deployed to the accompanying 
						cluster to help relieve pressure. 
						We are now multi-tenanant and stateless with customers spread across multiple instances. 
						Now we can support much larger instance sizes. 

		Continuous deployment – We now have frequent and faster release cycles. 
							Before we would push out updates once a week and now we can do so about two to 
							three times a day. 

		Highly maintainable and testable – Teams can experiment with new features and roll back if something doesn’t work. This makes it easier to update code and accelerates time-to-market for new features. Plus, it is easy to isolate and fix faults and bugs in individual services.

		Independently deployable – Since microservices are individual units they allow for fast and easy independent deployment of individual features. 

		Technology flexibility – Microservice architectures allow teams the freedom to select the tools they desire. 

		High reliability – You can deploy changes for a specific service, without the threat of bringing down the entire application.

	Microservice - single unit work
				  - spring boot - Rest API - one microservice

					product-microservice - Spring boot rest api project
					customer-microservice -  Spring boot rest api project
					order-microservice	-  Spring boot rest api project

	Characterization of microservice:-
						self-contained
						independent services 
						loosely coupled
						scalable 
						support continuous integration and deployment
						Each microservice should manage the data on its own db
						resilence
						service - communicate - service
						the services are registered & discoverable
						centralized configuration for the microservices
						Load Balancer
						etc.,.
			Microservice Architecture
		
					- Service to service communication
					- All services should be registered inside 1 registry those service will
						be discovered via registry
					- All the service needs to talk to another microservice via registry
					- All the service configuration should be brought to a one external or central config
					- circuit breaker to stop cascading failure while forwarding request to
					   another microservice which is down
						fault tolerate
					-ms
					- Tracing mechanism - to trace the request and responses in the call

					Problems in microservice distributed architecure:-
					=================================================
					service to service - ip and port number is not right choice
						synchrnous - restTemplate, FeignClient
						Asynchronous - WebClient
							 Eureka registry and discovery 
											Eureka Server location-  http://localhost:8761/eureka
											Eureka register as client - true / false
											Eureka fetch registry - true / false 	


							 Eureka Server - maintains regitry
										  IP and port no of all microservices
										- add dependency  spring-boot-cloud-eureka-server
									     - @EnableEurekaServer
											
							 Eureka Client	-
									    - all the microservices are eureka clients
									    - eureka client will register and deregister in eureka server registry
									    - spring-boot-cloud-eureka-client dependency
									    - @EnableDiscoveryClient
	
	

					external config - cloud config server
					circuit breaker - resilence4j
					Gateway - spring cloud gateway API
					distributed tracing - slueth, zipkins
			
					Spring boot - spring framework - microservice
					To solve the above listed problem spring framework has one project
					is called spring cloud project
				
					microservice - spring boot + spring cloud - completed
					service to service - RestTemplate , FeignClient , WebClient - complete
					registry and discovery - Netflix-eureka-service-discovery registry - complete
					external config - spring cloud config - complete
					circuit breaker - Spring circuit breaker - resilence4j- not completed
					distributed tracing -  slueth and zipkin - incomplete
					Gateway - Spring cloud gateway - completed
					Demo:-

					1. 3 - Microservices
					2. service to service communication
					3. Service registry and Discovery
					4. Central or external config
					5. Api gateway
					
			
					3 microservices -> spring boot + rest api
					1. microservice-a
					2. microservice-b
					3. microservice-c
										

		<properties>
    <spring-cloud.version>2025.0.0</spring-cloud.version>
</properties>
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>${spring-cloud.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>


										Interanl service communication
		client ---->	microservice-a ---> microservice-b
		
					1. Service to Service Communication
						RestTemplate - predefined class
									  - Http Request

					
	Eureka Service Registry & Discovery:-
		1. create Eureka-server as a seperate spring boot project
		2. u need add dependency spring-cloud-starer-eureka-server
					<dependency>
						<groupId>org.springframework.boot</groupId>
						<artifactId>spring-boot-starter-actuator</artifactId>
					</dependency>
					<dependency>
						<groupId>org.springframework.cloud</groupId>
						<artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
					</dependency>
		3. Goto the euerka-server application main method class and add one annotation
				@EnableEurekaServer
	Eureka - client 

		1. Spring boot user-service has to be made as a client
				u need a dependency 
				<dependency>
						<groupId>org.springframework.cloud</groupId>
						<artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
				</dependency>
		2. Goto the user microservice application main method class and add one annotation
				@EnableDiscoverClient



		Open Feign using service to service communication
			1. Add a feing client depdendecy
						<dependency>
							<groupId>org.springframework.cloud</groupId>
							<artifactId>spring-cloud-starter-openfeign</artifactId>
							<version>4.2.0</version>
						</dependency>
			2. u have to add one annotation
				Open the main method class and enable  @EnableFeignClients
			
			4. u have tlo create an interface with ncessary methods
				
					@FeignClient(name="MICROSERVICE-B")
					public interface OpenFeighnInterface {
					@GetMapping("/service-b") 
						public String getData(); }
					}


	1.Service to service communication
			
			RestTemplate -  programming approach - one service an talk to an other ms through ipaddress and port no						- it is not

			Open Feign - Declarative apparoach
						what to do you want


	Api gateway 
			create one spring boot project
			add spring cloud gateway api, actuator,devtool,eureka-client dependency
			
	Server Config:-
			
			1. git hub repository and write application-name.properties file

				
			2. Spring cloud config server -> pull the properties file from the github
				spring boot application
				add dependency 
				<dependency>
					<groupId>org.springframework.cloud</groupId>
					<artifactId>spring-cloud-config-server</artifactId>
				</dependency>
				<dependency>
					<groupId>org.springframework.boot</groupId>
					<artifactId>spring-boot-starter-actuator</artifactId>
				</dependency>
			3. goto the main method of the application added @EnableConfigServer
			4. goto the application.properties cloud config server
					spring.cloud.config.server.git.uri=https://github.com/rajeshn6/mscommonconfiguration
					#config server has pulled application.properties  file from the repo
					management.endpoints.web.exposure.include=*
					spring.cloud.config.server.git.skipSslValidation=true
					spring.cloud.config.server.git.clone-on-start=true
					management.endpoints.web.exposure.include=*
			
			3. Spring cloud config client 

				<dependency>
					<groupId>org.springframework.cloud</groupId>
					<artifactId>spring-cloud-starter</artifactId>
					<version>4.2.1</version>
				</dependency>
				<dependency>
					<groupId>org.springframework.cloud</groupId>
					<artifactId>spring-cloud-config-client</artifactId>
					<version>4.2.1</version>
				</dependency>
			4. Inside the every client microservice application.properties:
				spring.config.import=optional:configserver:http://localhost:8080
				spring.jackson.serialization.indent-output= true
				

Adding circuit breaker using resilence4j:-
		
		1. Add the dependencies
				<dependency>
   					<groupId>io.github.resilience4j</groupId>
   					<artifactId>resilience4j-spring-boot3</artifactId>
   					<version>2.0.2</version>
 				</dependency>
 				<dependency>
   					<groupId>org.springframework.boot</groupId>
   					<artifactId>spring-boot-starter-aop</artifactId>
 				</dependency>
		2. Add yml configuration
							
				management:
 				 endpoints.web.exposure.include:
   				 - '*'
  				endpoint.health.show-details: always
  				health.circuitbreakers.enabled: true

				resilience4j.circuitbreaker:
  				configs:
    					default:
      				registerHealthIndicator: true
      				slidingWindowSize: 10
      				minimumNumberOfCalls: 5
      				permittedNumberOfCallsInHalfOpenState: 3
      				automaticTransitionFromOpenToHalfOpenEnabled: true
      				waitDurationInOpenState: 5s
				      failureRateThreshold: 50
      				eventConsumerBufferSize: 10
		3. add a circuit breaker in service to service communication call
				@GetMapping("/service-a/find")
				@CircuitBreaker(name = "servicea-bcb",fallbackMethod = "failure")
				public String getMethodName() {
					String data =openFeighnInterface.getData();//MICROSERVICE-B/service-b
					System.out.println(data);
					return "service a made a call service b the response is: "+data;
				}
				public String failure(Throwable throwable) {
					return "Right now microservice-b is not available try after sometime";
				}





Logging:-
			used to keep track execution of the code 
			debugg of your application
			Logging framework:-
			1. Logger - log type, log level - record the information	
					// Logging various log level messages
       	 	logger.trace("Log level: TRACE");
        		logger.info("Log level: INFO");
        		logger.debug("Log level: DEBUG");
        		logger.error("Log level: ERROR");
        		logger.warn("Log level: WARN");
			2. Appender - the place where to record the information - console, file system, database
			3. Formatter - the format you want to record the information


			logging in java:-
				1. java.util.Logging
				2. Logback framework - spring boot application default logging framework
				3. Log4j2 framework
				4. etc.,.
			







In java 8 Features:-
===================
		Interface:-
			- Abstarction
			- Upto java 7 an interface can have only public abstract methods
			  And final static variable
			- On or After java 8 interfaces can also have implemented methods inside the 
			  interface
			why java 8 allows implemented method inside the interface 
		
		Functional Interface:-
			An interface should have only one abstract method and zero or more implemented
			methods or fields are called functional interface

			1. Userdefined Functional Interface
					Pay
			2. Predefined functional Interfaces
					Comparable - java.lang.Comparable
						int compareTo(T t), 
					Comparator - java.util.Comparator
						int compare(O o1,O o2), 
					Runnable - java.lang.Runnable
							void run();
					Predicate - java.util.function.Predicate 
						 boolean test(T t);
					Consumer - java.util.function.Consumer
						 void accept(T t);
					Function - java.util.function.Function
						 R apply(T t);
					Supplier - java.util.function.Supplier
						 T get();

		Lambda Expression
					c=a+b; // expression
					functions in java . If the same java function can be written as 
					an expression format.
						
					public void add(){// java function
					}
			
					a=()->{} - Lambda expression

					public void add(int a,int b){// java function
						return a+b;
					}
					
					c=(a,b)->a+b;
					
					Lamda Expression -> is nothing but it an implemenatation of one java	
										abstract function from functional interface

					Rules for writing lamda
					1. remove annotation
					2. remove access / non access modfier
					3. remove return type
					5. parameter also remove types
					6. one arg then bracket
					7. more than arg dont remove
					8. add an lamda operator -> after the parameter
					9. lamda body only one statement {}
					10. lamda body only one statement that to it is an return
						statement then remove return keyword
					
					
						boolean test(String t);
					    boolean result=t->t>10;
							
				
					
		@FunctionalInterface
		public interface Predicate<String> {		
    			boolean test(String t);
		}				
		Stream API


				T - Float
			public interface Comparable<Float> {
				 public int compareTo(Float o);
			}



Core Java:-
		JVM Architecture
				- Memory - Method area, Heap Area, Stack area		

		String 
				Ways to create a string in java
				String constant pool - memory allocation for the strings
				Muttable - what,why
				Immutable - what,why
				ways to create immutable string
				ways to create muttable string
		Inheritance:-
				To access the memebers of one to the other class
				1. IS-A - extends, implements
					1.1 Single Inheritance
					1.2 Multiple Inheritance - not possible ? why? 
								using inheritance
					1.3 Hierachial Inheritance
					1.4 Multilevel Inheritance
					1.5 Hybrid Inheritance
				2. HAS-A(Association) - creating an object of one class to the other class
					2.1 Aggregation
					2.2 Composition
				
					When to use HAS-A or IS-A. use case Scenario / (example)
					Aggregation VS Composition
		Encapsulation:-
					Why getter / setter class is needed
		Polymorhsim:-

					What is polymorphism			
					real time example - sending a parcel - postal, courier, byself, friends
					Types of polymorphsim
					1. method overloadding - real time use case , one program
					2. method overriding - real time use case , one program
					when to use method overlaodding vs method overrding
					Binding - compile time / early / static binding Vs
								Runtime / late / dynamic binding
			Abstraction:-
					U want to implement some code but u dont remember right noe what is
					an implementation
						Eg:- public void add(); 
					Showing essential details hidding the complex details called abstraction

					1. abstract class
							if a class has minimum one abstract method then that class is 
							called as abstract class

					2. Interface
							if a class has all the methods abstract method then mark ur
							class as interface
					abstract class vs interface

					Note:- till 1.7 an interface can have only abstract methods 
							on or after 1.8 an interface can also has implmented method
				
			final
					1. before a variable
							final int n=10 - constant
					2. before a method
							final void add(){ // final method cannot be overridden
 							}
					3. before a class - u cannot inherit IS-A. final class cannot be extended 
							public final class Demo{
							}

			abstract class vs final class
					u cannot create for object for an abstract class (HAS-A inheritance is not possible)
					abstract class u can extend,implements (IS-A is possible)

					final class cannot be inherited (IS-A inheritance is not possisble)
					u can create an object for the final class(HAS-A inheritance possible)

			Exception Handling
					
					what is exception
					why exception are need to be handle reason
					if u do not exception what will happen
					two types of exception
						1. Unchecked Exception -  Any exception class which extends RuntimeException

						2. Checked Exception-Any exception class which extends Exception

					how do u handle exception try with catch block
					exception propogation - throws

					throw - creates an excpetion manually throw that into the catch block
							throw new RestaurentIdNotException();
					
					
			Arrays - array can store a group of elements 
						int[] rating=new int[5]; array is holding 5 primitive int values
						String[] names=new String[5]; array is holding 5 String objects
					- array size is fixed. u can cannot increase / decrease the size
					
			Collection - can store group of elements / objects not the primitve 
					- dynamic in size

				Collections frameworks -  set of interfaces, abstract class, enums, classes
										  - That helps us to manage the group of objects
												1. add a object to the collection
												2. remove object from the collection
												3. sort the collection asc/ desc
												4. find an object in the present collection etc
						
				Each collection classes are backed by one datastructure algorithm
				

				ArrayList - ds array vs LinkedLIst  ds - linkedlist ds
				List 
						Ordered
						Accepts null
						accept duplicate
				Set - only one object as value
						UnOrdered
						not Accepts null
						will not accept duplicate
				Map - accepts two object at a time key,value
						UnOrdered
						not Accepts null
						will not accept duplicate

				use case scenario for using the collection classes


			















GCP Cloud:-
		
		1. one cognizant website
		2. search as clearn -> click clearn
		3. landing page will cognizant learning page -> click on the search option

installing java:-
		1. sudo su
		2. apt update
		3. apt install default-jre	
		4. apt install default-jdk


install git:-
		1. apt update
		2. apt-get install git
		3. git --version
	
installing maven:-

		1. apt-get install maven
	

Dokerize your application:-
		1. Take spring boot application
		2. goto project root folder -> right click create a file name
			as Dockerfile
		3.	docker file instruction
		4. push then upted code to remote repository
		5. goto linux-docker virtual machine instance
		6. clone the remote repository 
		7. cd into project directory
		8. ls and check dockerfile is there
		9. generate an docker image file from the Dockerfile instructor
		10. dockerization is done
		11. u need to run containerized application of your image as a docker 
			container


Steps to  create a virtual machine:-
		$ sudo su -  logged in as root user. exit command used to exit from 
						the root user to normal user
		$ clear - which clear the command prompt
		TO install Docker commands
		==========================	
		Set up Docker's apt repository.
		# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
		
		docker --version
		docker info
		apt-get install maven
		ls - list the current directory files and folders
		pwd - present working directory
		cd .. - change to parent directory

		vi Dockerfile
		goto insert mode
		FROM openjdk:17
		COPY ./target/irctc-0.0.1-SNAPSHOT.jar irctc-0.0.1-SNAPSHOT.jar
		CMD ["java","-jar","irctc-0.0.1-SNAPSHOT.jar"]
		:wq - write and quit the editor
		cat filename - show the content of the file in command line
		goto project root foilder 
		mvn clean install
		docker build - create an docker image
		docker build . 
		


Docker commands:-
================
		1. docker --version
		2. docker info
		docker images:-

			1. create image
					docker build -f Dockerfile pathoftheDockerfile
					
			2. remove image
					docker image rm imagenameorimageid

			3. to remove all unused image
					docker images prune	

			4. to list all the images
					docker images

		commands to manage docker container
			1. create a container
					docker run imagenameorimageid

			2. to list all the running container
					docker ps

			3. to list both running and non running container
					docker ps -a

			4. Stop the running container 
					docker stop containernameorcontainerId

			5. start the stopped container
					docker start containernameorcontainerid


sudo apt-get -y install default-mysql-client
html:-
=====
	documentation
	collections of html predefined elements or tag
			<html>
			<head>
			<body>
			<h1>
			<p>
			<form>
			<input>
			<article>
			<aside>
			<audio>
			<video>
	rules to write element or tags in html
		1. only html predefined elements or tag
		2. some html elements will have start tag and end tag
					<element> - start tag
					</element> - end tag
		3. html elements contains
					<p></p>
					1. attribute(s)
						<p align="center" style="color:red" id="" class=""></p>	
					2. text context
						<p>This is rajesh from chennai</p>
					3. nested other html elements
						<p>
							<div></div>
							<aside></aside>							
						</p>
		4. html elements should be written in lowercase 
					
		5. some html elements are self closing tag
					<br/>
					<hr/>





			attribute zero or more attribute
					attribute -> name=value
				
			<elementname attributename=value></elementname>
			
				<h1></h1>

				
				
				<html>
					<head></head>
					<body></body>
				</html>
				<h1>dhkjfshd sdfhsdkjfhsdkj dsfdskj</h1>
				<p>jfkjdf sdfbskjdfhbkjk s dsfbjsdh</p>
				<h2></h2>


			Broswer - html parser will parses the html document content

					- constructs an equivelent DOM tree struture for the paresed html document





===================================================================================================
html -  basic of html, attribute
css -  Applying styles for html elements 
	   
		selector {
			name:value;       - style property - style rule
			name:value;		 
			name:value;
		}
	

		Selector - the style rules need to get applied what and which html element
		css selector types:-
		-------------------
		1. element selector
		2. class selector (.)
		3. id selector (#)
		4. multiple selector
		5. descended selector
		6. universal selector
		7. css attribute selector
		8. sudo selector
	   



js - variable
	 datatype - primitive type
				 number,string,null,undefined,boolean
			   - composite types
				 Array, Object, Date etc
	js is not strict type language - DYNAMIC TYPING

	 array - []	
		 var a=[23,56,46,787];
		 

		iterate an array, manuplation . add an element, delete an element, filter an element

	 object - {}
				- object will have properties and behaviour

				iterate an object, entries, keys, values
	 methods
		-> function declaration
				 function add(a,b){  
                			return a+b;
        			 }
		-> function expression	
				var x=function add(a,b){  
                 		return a+b;
        			}
		-> anonymous function
				var x=function(a,b){ 
                 		return a+b;
        			}
		
		-> Arrow function
				var x=(a,b)=> a+b;
	
	
		function can be assigned to a variable

	 callback methods:-
			

	 callback hell:-

	 Event handling
				event source
				event action listener

	 Exception Handling - try catch finally
	 Dom Manuplate - getElementById, byName, byTag, querySelector, querySelectorAll
			create an one element attach with the exisiting DOM tree
			Remove element from the DOM Tree
			add or remove an attribute
			add or remove a text node
			add or remove style rules

	 ES 6 - let, const, spread, Rest, Destructing an array, Destructure an js object, modules, classes, promises

	
	 typescript
		
     react
	

	

	 Advanced JS
		- classes
		- object

		- dynamic type - no datatype is needed to mentioned in the variable
	
		mavan - 
		gradle - 

===========================================================================================================================================		
React:-
		The library for web and native user interfaces
		Create user interfaces from components
		React lets you build user interfaces out of individual pieces called components. 
		Create your own React components like navbar, footer,image gallery, Thumbnail, LikeButton, and Video. 
		Then combine them into entire screens, pages, and apps.

		
		node js - Install the Environment
		npm - node package manager     --- mvn

		npx create-react-app appname
		
		js --> js engine(Engine)
			   node js


======================================
build tool - vite
		npm create vite@latest
		
		cd projectfolder

		npm install - node modules - node modules is going to have dependencies that are needed to 
									 write, compile, run, test , deploy react application
								   - package.json
		npm run dev
===================================================
html
	element 
	html 5 - section, haeder, navbar, video, audio
	attribute
	forms - all input controls
	
css
	style rule
	types of stylesheet
		1. inline
		2. internal
		3. external 

	css selector - element, id, class, etc
	
	Bootstrap frameworks
	
js
	datatypes
	js array and objects
	how to iterate array vs object
	Arrays method
	Object method
	map function
	filter function
	functions
		1. nammed function
			function name(){
			}
			let x= function name(){
			}
		2. anonymous function
			
			let x= function(){ 
			}

			let y=()=>{   v// arrow function
			}
	Dom Tree
	DOM manipulation method
	event handling
	ES-6 let,const,destructuring, spread, rest operator
ts

react


javascript vs typescript

JavaScript:
Uses dynamic typing, meaning the type of a variable is determined at runtime. 
This can lead to runtime errors and makes large projects harder to maintain. 
			let x;
			x=10; //number
			x='cts' //string
			x=false //boolean

		Event handling:-
		===============	
				Event Source
				Event object - type of event
				Event Action Listener 

				When user interacts with the web pages events will get created
				Add an action Listener
				Button
				Click  --> onclick --> java script (ActionListener)

				<button onclick="buttonClicked()">Click</button>
			
				function buttonClicked(){
						//action
				}

				dropdown --> onchange ---> java script (ActionListener)

				key --> keyup -->  java script (ActionListener)
				

TypeScript:
	ts is a superset of js

	Uses static typing, which means the type of a variable is checked at compile time. 
	This helps catch errors early and improves code robustness. 
	let x:number;  
	x=10; //ok
	x='cts' - error //string
	x=false -  error //boolean
	
	js ----> js engine(Browser) ----> output

		
		    (Babel)    
	ts-----> transpiler -----> js -----> js Engine(Browser)----> output
			(tsc)

typescript:- (OOP)
	1. static typing 
	2. interface
	3. classes
	4. Enum
	5. Generics
	6. Union 
	7. Type Guards
	8. Type Inference
			let x;
			x=40; //number
	9.  Optional Chaining
	10. Decorators (Angular)
			
============================================================
React JS:-

		js + html => jsx
		ts + html -> tsx


		

JSX(Javascript XML) - html + javascript 
			  - always always return on html root element
			  - jsx - javascript xml --> html + javascript	
						   <>
							<p>lorem</p>
							{js script}
							<p>lorem</p>
						   </>
								
			  - tsx - typescript xml --> html + typescript	
						   <>
							<p>lorem</p>
							{ts script}
							<p>lorem</p>
						   </>
react -> js
	  -> typescript - cts - handbook 

		
		javascript:-
				dynamic type - need not to tell the datatype of any variable
				var a;
				a=10; //determine in type
		
		typescript:-
				superset of js
				static type - u must defined datatype while creating a variable
			
				let a:number=10;
				name:string='rajesh'
				
				int a=10;


React JS:-
	Prerequiste:-
		1. js knowledge
		Installed:-
		1. Node js
		2. NPM 
		We used to create
		
	
	React is an component based liberary used to build user interfaces(front end application)
	build user interfaces out of individual pieces called components
	Component = UI + State(Data)
			Header Component -> UI(html,css,js) + state 
			ContentComponent -> UI + state
	UI 
		static content (html)
		dynamic content (js / ts - props and State(Data))

	Virtual DOM in react js. How virtual DOM improves the performance 

Types of component in react:-
============================
		1. functional component -> 
			if u create a component using an function that return one portion of ui in jsx/tsx
		2. class component	-> 
			create an component using an typescript class that has render method 
			that returns one portion of ui in jsx/tsx
						  
		 before react 16  through class component u create life cycle method of a component
	
		 Note: after react 16 no one using class component because they have introuced new concept 
			   called as react hooks. through react hooks u can
			   implement lifecycle methods in functional component. 
			    every devloper prefering functional compoment

		props and state both are predefined objects in react

		props -> generally passes from parent component to a child component, immutable or only readable, props can be passed as an attaribute from
			   the parent component to child component

		state -> Any dynamic content that can be stored in a state,
				 setState method u can the state - muttable, 
				 state is local to the component

	   	both the states and props both are objects that can be destructured

		1. class component - props and state
				class Header extends React.Component{
					constructor(props:any){
						super(props)
						this.state={};
						this.clickHandler=this.clickHandler.bind(this);
						this.onChangeHandler=this.onChangeHandler.bind(this)
					}
					function clickHandler(){
						setState(this.state);
					}
					render(){
						return<>
							<button onClick={this.clickHandler}></button>
						</>
					}
				}
		2. functional component - props and state
				let [state,setState]=useState(); // useState hook will help u to create state inside the functional component
				function Header(props){
					return <>
						 </>
				}


A component's lifecycle has three main phases: 
		In React, components have a lifecycle that consists of different phases. 
		Each phase has a set of lifecycle methods that are called automatically at specific points in the component's lifecycle.
		These methods allow you to control the component's behavior and perform specific actions at different stages of its lifecycle.

		1. Mounting Phase
				The mounting phase refers to the period when a component is being created and inserted into the DOM.
				1.1 The constructor() lifecycle method - 
						initialize state and props, bind the event handlers
				1.2 The render() lifecycle method - 
						render method is called again when props or state changes
				1.3 The getDerivedStateFromProps() lifecycle method - 
						During the mounting phase,is called after the constructor and before render().
				1.4 The componentDidMount() lifecycle method - method is called once the component has been mounted into the DOM. 
											     listeners/timers/exteral api call
		2. Updating Phase -  if there is an update or change either props or state
				2.1 componentWillUpdate()
				2.2 componentDidUpdate()
				2.3 getSnapshotBeforeUpdate()
		3. Unmounting Phase.
				3.1 componentWillUnmount()

	To implement the above life cycle methods in functional component we have to use react hooks useEffect()

						useState
						useEffect
						useParam
						useReducer
						useSelector
						useRef
						useMemo
						useCallback

						custom hooks
			How to create custom hooks in react
	
	SPA - Single Page Application
	
	How we can implement SPA inside react application.
		u can implement SPA using react router
		1. how to install react router
		2. u need to add <BrowserRouter> in the main.tsx component
		3. got app.tsx  need to configure Routes and route along with path and the component to be loaded
		4. instead href need to use react router <NavLink to="/login">Login</NavLink>

	Form validate:-
		1. Every input control is there in the form need to implment onBlur, onChange, onsubmit
		
	useContext API, useReducer, Redux

	calling to the external  -  promises
			1. xmlHttpRequest(AJAX)
			2. Fetch API - promises
			3. Async Await - promises
			4. Third party library - Axios (need to install seperatly)
			5. Testing react app(Unit)
	Docker Containers:-

	microservices
	Git & Git Hub collaberation
	gcp and docker
	Jenkins CI/CD devops
	sonarqube
	AOP / spring reactive programming










Stream API;
			
		source.stream().filter(predicate);
		source.stream().sorted(comparator);
		6,8,3,5		   
		source.stream().map(a->a*a).forEach()
						   25,64,9,25



		
	





		 

































			



















				































































		
















































					






















