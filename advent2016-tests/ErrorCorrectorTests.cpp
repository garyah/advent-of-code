#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2016/ErrorCorrector.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2016;

namespace advent2016tests
{
    TEST_CLASS(ErrorCorrectorTests)
    {
    public:
        
        TEST_METHOD(TestMethod06a1)
        {
            ErrorCorrector corrector;
            corrector.addMessage("eedadn");
            corrector.addMessage("drvtee");
            corrector.addMessage("eandsr");
            corrector.addMessage("raavrd");
            corrector.addMessage("atevrs");
            corrector.addMessage("tsrnev");
            corrector.addMessage("sdttsa");
            corrector.addMessage("rasrtv");
            corrector.addMessage("nssdts");
            corrector.addMessage("ntnada");
            corrector.addMessage("svetve");
            corrector.addMessage("tesnvt");
            corrector.addMessage("vntsnd");
            corrector.addMessage("vrdear");
            corrector.addMessage("dvrsen");
            corrector.addMessage("enarar");
            corrector.doForwardCorrection();
            Assert::AreEqual("easter", corrector.getCorrected());
        }

        TEST_METHOD(TestMethod06b1)
        {
            ErrorCorrector corrector;
            corrector.addMessage("eedadn");
            corrector.addMessage("drvtee");
            corrector.addMessage("eandsr");
            corrector.addMessage("raavrd");
            corrector.addMessage("atevrs");
            corrector.addMessage("tsrnev");
            corrector.addMessage("sdttsa");
            corrector.addMessage("rasrtv");
            corrector.addMessage("nssdts");
            corrector.addMessage("ntnada");
            corrector.addMessage("svetve");
            corrector.addMessage("tesnvt");
            corrector.addMessage("vntsnd");
            corrector.addMessage("vrdear");
            corrector.addMessage("dvrsen");
            corrector.addMessage("enarar");
            corrector.doReverseCorrection();
            Assert::AreEqual("advent", corrector.getCorrected());
        }

    };
}
