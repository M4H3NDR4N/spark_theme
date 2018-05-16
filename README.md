# spark_theme
OpenEdx Ginkgo Theme

The Website Link:  http://iwized.com/


                                   		 OPENEDX CONFIGURATION

The Native OpenEdx 2.2  Installation guide is given below:

1)Download OpenEdx ginkgo.2.2 installation file from  https://bitnami.com/stack/edx.

2)Use the command in terminal:
              chmod 755 bitnami-edx-ginkgo.2-2-linux-x64-installer.run
              ./bitnami-edx-ginkgo.2-2-linux-x64-installer.run
	      
      3)   Start manager-linux-x64.run to run your server.
      
      4)   Follow instructions: http://edx.readthedocs.io/projects/edx-installing-configuring-and-running/en/latest/configuration/index.html
      
      5)   To enable read+write permission for the theme as edxapp user, follow the commands:
             sudo chown -R iwiz:iwiz my-theme
	sudo chmod -R u+rw my-theme
             	

To update the theme for LMS and CMS/Studio:
  Activate edxapp user to update the the themes, follow the commands:
     sudo su -s /bin/bash
     source apps/edx/scripts/edxapp_env
     cd apps/edx/edx-platform

  To update your theme use the paver command:  
     paver update_assets. (or)
     paver update_assets lms --settings=aws.

    If you want to update only the static files of  LMS, use the command:
    paver update_assets lms --themes=my-theme 
     And for CMS, use the command:
    paver update_assets cms --themes=my-theme

Drag and Drop Problem:
Go to edx/var/staticfiles/Xblock/resources and install using pip the module you want to add,
pip install my_drag_and_drop_style

After installation, edit the lms.env.json file as:

“XBLOCK_SETTINGS”:{
       	“drag_and_drop_v2”:{
		“theme”:{
			“package”:”my_drag_and_drop_style”
			 “Location” [css/my_drag_and_drop_style.css”]
}
}
}

Creating Django apps:
If you are going to add custom fields to the registration page, then do as follows:
you just have to follow this steps to edit existing registration form.

1. Open the lms.env.json and cms.env.json files, and set the ENABLE_COMBINED_LOGIN_REGISTRATION feature  flag to True. These files are located one level above the edx-platform directory.

2. Use Python to create a Django form that contains the fields that you want to add to the page, and then create a Django model to store the information from the form.

   2.1. First create a Django App at edx-platform/lms/djangoapps from edx-latform directory as,

       2.1.1. Make APPNAME folder in djangoapps directory and then run,
   
           $python manage.py lms startapp APPNAME lms/djangoapps/APPNAME

   2.2. Create a model for the new fields in ms/djangoapps/APPNAME/models.py
   2.3. Create a form for the new fields in lms/djangoapps/APPNAME/forms.py
   2.4. Register your app in lms/djangoapps/APPNAME/admin.py

3. In the lms.env.json file, add the app for your model to the ADDL_INSTALLED_APPS array.
   
   "ADDL_INSTALLED_APPS":["APPNAME"]

4. In the lms.env.json file, set the REGISTRATION_EXTENSION_FORM setting to the path of the Django form
  that you just created, as a dot- separated Python string.

  "REGISTRATION_EXTENSION_FORM":"APPNAME.forms.FORMNAME"

5. Run database migrations
   
   $python manage.py lms makemigrations registration_extra_field --settings=devstack
   $python manage.py lms migrate registration_extra_field --settings=devstack

6. Restart LMS












