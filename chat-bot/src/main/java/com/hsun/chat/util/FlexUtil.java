package com.hsun.chat.util;

import com.linecorp.bot.model.message.flex.component.Button;
import com.linecorp.bot.model.message.flex.component.Text;
import com.linecorp.bot.model.message.flex.unit.FlexAlign;
import com.linecorp.bot.model.message.flex.unit.FlexFontSize;
import org.springframework.stereotype.Component;

@Component
public class FlexUtil {

    /**
     * 取得背景色
     * @return
     */
    public String getBackgroundColor() {
        return "#303030";
    }

    /**
     * 取得預設字顏色
     * @return
     */
    public String getFontColor() {
        return "#FFFFFFFF";
    }

    /**
     * 取得漲的顏色
     * @return
     */
    public String getPositiveColor() {
        return "#00c800";
    }
    /**
     * 取得跌的顏色
     * @return
     */
    public String getNegativeColor() {
        return "#c80000";
    }

    /**
     * 取得標題文字樣式模板
     * @return
     */
    public Text getHeaderText(){
        return Text.builder()
                .color(getFontColor())
                .weight(Text.TextWeight.BOLD)
                .size(FlexFontSize.Md)
                .align(FlexAlign.CENTER)
                .build();
    }
    /**
     * 取得內容文字樣式模板
     * @return
     */
    public Text getContentText(){
        return Text.builder()
                .color(getFontColor())
                .size(FlexFontSize.SM)
                .align(FlexAlign.CENTER)
                .build();
    }
    /**
     * 取得內容按鈕樣式模板
     * @return
     */
    public Button getContentButton(){
        return Button.builder()
                .style(Button.ButtonStyle.PRIMARY)
                .build();
    }
}
