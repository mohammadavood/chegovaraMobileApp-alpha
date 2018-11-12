package com.chegovaraa;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.microsoft.codepush.react.CodePush;//add it for CodePush's config
import com.microsoft.codepush.react.ReactInstanceHolder;//add it for CodePush's config

public class MyReactNativeHost extends ReactNativeHost implements ReactInstanceHolder {//add it for CodePush's config
  // ... usual overrides
}

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    //add this @override for CodePush's config
    @Override
    protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new CodePush("oL0HqfhM6GGFUedBEQb4E63DR5mtSJ3DEN4TX", MainApplication.this, BuildConfig.DEBUG)//add this line for CodePush's config
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    CodePush.setReactInstanceHolder(mReactNativeHost);//add it for CodePush's config
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
