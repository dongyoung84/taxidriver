
package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class RNKakaoTestModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNKakaoTestModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNKakaoTest";
  }
    // 이 함수를 추가합니다.
  @ReactMethod  
  public void foo(final Callback callback) {
    callback.invoke();
  }
}