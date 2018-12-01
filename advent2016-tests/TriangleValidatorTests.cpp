#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2016/TriangleValidator.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2016;

namespace advent2016tests
{
    TEST_CLASS(TriangleValidatorTests)
    {
    public:
        
        TEST_METHOD(TestMethod03a1)
        {
            TriangleValidator validator;
            validator.addRow("5 10 25");
            Assert::AreEqual((float)0, (float)validator.getNumValidByRows(), 0.f);
        }

        TEST_METHOD(OneValidByRowsReturnsOne)
        {
            TriangleValidator validator;
            validator.addRow("3 4 5");
            auto numValid = validator.getNumValidByRows();
            Assert::AreEqual((float)1, (float)numValid, 0.f);
        }

        TEST_METHOD(TestMethod03b1)
        {
            TriangleValidator validator;
            validator.addRow("101 301 501");
            validator.addRow("102 302 502");
            validator.addRow("103 303 503");
            validator.addRow("201 401 601");
            validator.addRow("202 402 602");
            validator.addRow("203 403 603");
            Assert::AreEqual((float)6, (float)validator.getNumValidByColumns(), 0.f);
        }

        TEST_METHOD(OneValidByColumnsReturnsOne)
        {
            TriangleValidator validator;
            validator.addRow("3 1 1");
            validator.addRow("4 2 2");
            validator.addRow("5 3 3");
            Assert::AreEqual((float)1, (float)validator.getNumValidByColumns(), 0.f);
        }

    };
}
